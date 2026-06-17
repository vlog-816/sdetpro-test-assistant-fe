import React, { useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";

export default function GeneratePage() {
  const [issueKey, setIssueKey] = useState("");
  const [isAnalyze, setIsAnalyze] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const [preflight, setPreflight] = useState<any | null>(null);
  const [testcases, setTestcases] = useState<any | null>(null);

  const analyze = async () => {
    if (!issueKey.trim()) return;

    setIsAnalyze(true);
    setPreflight(null);

    try {
      const res = await api.post("/generations/preflight", {
        issueKey: issueKey.trim(),
      });
      setPreflight(res.data);
    } catch (err: any) {
      setPreflight({ error: err?.response?.data?.error || "Analysis failed" });
    } finally {
      setIsAnalyze(false);
    }
  };

  const performGeneration = async () => {
    if (!issueKey.trim()) return;

    setIsGenerate(true);
    setTestcases(null);

    try {
      const res = await api.post("/generations/testcases", {
        issueKey: issueKey.trim(),
      });

      setTestcases(res.data.data);
    } catch (err: any) {
      console.log(err);
      setTestcases({
        error: err?.response?.data?.error || "Generation failed",
      });
    } finally {
      setIsGenerate(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      analyze();
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading and subheading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Generate Test Cases
        </h1>
        <p className="mt-2 text-gray-600">
          Enter a Jira issue key to analyze and generate comprehensive test
          cases
        </p>
      </div>

      {/* Input field and 2 buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter a JIRA issue key. (KAN-1, KAN-2, KAN-3, ...)"
            onChange={(e) => setIssueKey(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <button
            disabled={!issueKey || isAnalyze || isGenerate}
            onClick={analyze}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyze ? "Analyzing..." : "Analyze"}
          </button>
          <button
            disabled={!issueKey || isAnalyze || isGenerate}
            onClick={performGeneration}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerate ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/**Preflight Result */}
      {preflight && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Analysis Results
          </h2>
          {preflight.error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {preflight.error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/**Layout 1 */}
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Issue key
                  </span>
                  <p className="text-md sm:text-lg font-medium text-gray-900">
                    {preflight.issueKey}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Tittle
                  </span>
                  <p className="text-md sm:text-lg font-medium text-gray-900">
                    {preflight.title}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    UI Story
                  </span>
                  <p className="text-md sm:text-lg font-medium text-gray-900">
                    {preflight.isUiStory ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              {/**Layout 2 */}
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Attachment
                  </span>
                  <p className="text-md sm:text-lg font-medium text-gray-900">
                    {preflight.attachments || 0}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Estimated Token
                  </span>
                  <p className="text-md sm:text-lg font-medium text-indigo-800">
                    {preflight.estimatedTokens}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Estimated Cost
                  </span>
                  <p className="text-md sm:text-lg font-medium text-indigo-800">
                    {preflight.estimatedCost}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/**Generation Result */}
      {testcases && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Generation Complete
          </h2>
          {testcases.error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {testcases.error}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Issue Key
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {testcases.issueKey}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Generation Time
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {typeof testcases.generationTimeSeconds === "string"
                      ? `${testcases.generationTimeSeconds}s`
                      : `${Number(testcases.generationTimeSeconds || 0).toFixed(1)}s`}
                  </p>
                </div>
              </div>
              {testcases.markdown && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✅ Test cases generated successfully!{" "}
                    <Link
                      to={`/${testcases.generationId}/view`}
                      className="font-semibold underline hover:text-green-900"
                    >
                      View test cases
                    </Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

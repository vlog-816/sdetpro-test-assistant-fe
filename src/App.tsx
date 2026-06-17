import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GeneratePage from "./pages/GeneratePage";
import DashboardPage from "./pages/DashboardPage";
import type React from "react";
import { useAuthStore } from "./state/auth";
import ViewPage from "./pages/ViewPage";
import NotFound from "./pages/NotFound";

function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const token = useAuthStore((s) => s.accessToken);
  if (token) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

function Layout({ children }: { children: React.JSX.Element }) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const authPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (authPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/** 1.Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/** Title */}
            <div className="flex items-center gap-1">
              <h1 className="text-sm md:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI-POWERED TEST ASSISTANT
              </h1>
            </div>
            {/** Navigation */}
            <nav className="flex items-center gap-1">
              <Link
                to={"/"}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                } `}
              >
                Generate
              </Link>
              <Link
                to={"/dashboard"}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
            </nav>
            {/** Username, logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {user?.email || "Guest"}
              </span>
              <button
                onClick={logout}
                className="px-2 py-2 text-sm text-gray-700 border border-gray-300 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/** 2.Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <Layout>
              <PrivateRoute>
                <GeneratePage />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            </Layout>
          }
        />

        <Route
          path="/:id/view"
          element={
            <Layout>
              <PrivateRoute>
                <ViewPage />
              </PrivateRoute>
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

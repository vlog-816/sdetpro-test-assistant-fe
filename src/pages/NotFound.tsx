import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-state-50">
      <Link to={"/login"}>
        <img
          src="404-not-found-1.png"
          alt="not found"
          className="max-w-full mb-6"
        />
        <span className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Go home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;

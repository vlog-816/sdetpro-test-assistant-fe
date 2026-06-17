import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    //<div className="flex items-center justify-center min-h-screen text-center bg-state-50">
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden">
      <Link to={"/login"}>
        <img
          src="404-not-found-1.png"
          alt="not found"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <span className="relative inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition-colors">
             Go home
        </span>
      </Link>
    </div>
  );
};

export default NotFound;

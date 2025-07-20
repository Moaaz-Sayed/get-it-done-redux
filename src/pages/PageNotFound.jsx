import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-900 p-8 text-center text-white">
      <span className="text-[5rem]">😢</span>
      <h1 className="text-[6rem] font-bold text-red-500">404</h1>
      <p className="text-[1.8rem] text-slate-300">Oops! Page not found</p>
      <Link
        to="/"
        className="text-[1.6rem] text-blue-400 underline transition-colors hover:text-blue-600"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;

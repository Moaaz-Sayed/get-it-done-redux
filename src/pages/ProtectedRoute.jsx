import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FullPageSpinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
  const { user, status } = useSelector((state) => state.auth);

  if (status === "loading") return <FullPageSpinner />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;

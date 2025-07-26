import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ReverseProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user) return <Navigate to="/todos" replace />;

  return children;
}

export default ReverseProtectedRoute;

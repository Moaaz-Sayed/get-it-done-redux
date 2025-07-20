import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import PageNotFound from "./pages/PageNotFound";
import ReverseProtectedRoute from "./pages/ReverseProtectedRoute";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <ReverseProtectedRoute>
                <Login />
              </ReverseProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ReverseProtectedRoute>
                <Signup />
              </ReverseProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

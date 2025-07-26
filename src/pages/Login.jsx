import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import FullPageSpinner from "../ui/Spinner";
import Input from "../ui/Input";
import Button from "../ui/Button";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate("/todos");
    }
  }

  if (status === "loading") return <FullPageSpinner />;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md"
      >
        <Logo size="lg" />

        <div className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            size="sm"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            size="sm"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

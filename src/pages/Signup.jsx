import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import FullPageSpinner from "../ui/Spinner";
import Input from "../ui/Input";
import Button from "../ui/Button";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { status, error } = useSelector((state) => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(signup({ username, email, password }));
    if (signup.fulfilled.match(result)) {
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User Name"
            size="sm"
            required
          />
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
          {status === "loading" ? "Signing up..." : "Sign up"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

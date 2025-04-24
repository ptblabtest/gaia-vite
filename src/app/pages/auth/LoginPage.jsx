
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuthStore from "@/lib/authStore";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import Label from "@/components/Label";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("/auth/login", formData);
      const { token, user, expiresAt } = response.data;
      login(token, user, expiresAt);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <Label className="mb-1" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border block w-full h-10 pl-2"
        />
      </div>
      <div className="mt-4">
        <Label className="mb-1" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border block h-10 w-full pl-2"
        />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button
          className="ml-3 px-2 py-2 rounded-md text-white text-lg bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}

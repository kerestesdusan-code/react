import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type LoggedUser = {
  id: string;
  email: string;
  fullName: string | null;
  groupId: number;
};

type LoginResponse = {
  message: string;
  token: string;
  user: LoggedUser;
};

interface LoginFormData {
  email: string;
  password: string;
}

interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ disabled, children }: ButtonProps) => (
  <button
    disabled={disabled}
    className={`w-full btn btn-primary ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    type="submit"
  >
    {children}
  </button>
);

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaEnabled = process.env.REACT_APP_RECAPTCHA_ENABLED === "true";

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      let recaptchaToken: string | undefined;

       if (recaptchaEnabled) {
        if (!executeRecaptcha) {
          setErrorMessage("reCAPTCHA is not ready. Please try again later.");
          return;
        }

        recaptchaToken = await executeRecaptcha("login");
      }

      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        recaptchaToken,
      });

      const { token, user } = response.data;

      setAuth(token, user);

      if (user.groupId === 1) navigate("/users");
      else navigate("/");

      setSuccessMessage("Login successful!");
      setFormData({ email: "", password: "" });
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || "Login failed. Please try again."
      );
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mt-1 block w-full input input-bordered"
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mt-1 block w-full input input-bordered"
          autoComplete="current-password"
        />

        <Button disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {successMessage && (
        <p className="text-green-600 mt-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Login;

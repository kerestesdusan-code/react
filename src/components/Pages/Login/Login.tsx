import React, { useState, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

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
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full btn btn-primary ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="submit"
    >
      {children}
    </button>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReCAPTCHA = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA challenge.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email: formData.email,
        password: formData.password,
        recaptchaToken,
      });

      const { token, user } = response.data;

    setAuth(token, user);

      if (user.groupId === 1) {
        navigate("/users");
      } else {
        navigate("/");
      }

      setSuccessMessage("Login successful!");
      setFormData({ email: "", password: "" });

      setRecaptchaToken(null);
      recaptchaRef.current?.reset();

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

        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
          ref={recaptchaRef}
          onChange={handleReCAPTCHA}
        />

        <Button disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default Login;

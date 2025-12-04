import React, { useState, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface LoginFormData {
    email: string;
    password: string;
    fullName: string;
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
            className={`w-full btn btn-primary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
};

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        fullName: "",
    });

    console.log(BASE_URL, process.env);


    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
            const response = await axiosInstance.post("/auth/login",
                {
                 email: formData.email,
                 password: formData.password,
                 recaptchaToken,
                }
            );      

            const userToken = response.data.token;
            setToken(userToken);
            localStorage.setItem("authToken", userToken);

            setSuccessMessage("Login Successful!");
            setFormData({ email: "", password: "", fullName: "" });
            setRecaptchaToken(null);
            recaptchaRef.current?.reset();
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || "Login failed. Please try again.");
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
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="mt-1 block w-full input input-bordered"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mt-1 block w-full input input-bordered"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="mt-1 block w-full input input-bordered"
                />

                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
                    ref={recaptchaRef}
                    onChange={handleReCAPTCHA}
                />

                <Button disabled={loading}>{loading ? "Logging in..." : "Log In"}</Button>
            </form>

            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            {token && (
                <p className="text-gray-600 mt-4">
                    Token saved: <span className="font-mono text-sm">{token}</span>
                </p>
            )}
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

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
    const validChildren = React.Children.toArray(children).map((child, index) => {
        if (typeof child !== "string" && typeof child !== "number") {
            console.warn(`Button chiid at index ${index} is not string or number.`)
        }
        return child;
    });

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full btn btn-primary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {validChildren}
        </button>
    );
};

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        fullName: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState<String | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axiosInstance.post("auth/login", formData);

            //saving token to state localStorage
            const userToken = response.data.token;
            setToken(userToken);
            localStorage.setItem("authToken", userToken);

            setSuccessMessage("Login Successfull");
            setFormData({ email: "", password: "", fullName: "" });
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || " Login failed. Please try again");
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
import React, { useState } from "react";
import axios from "axios";

interface RegisterResponse {
    message: string;
    token?: string;
}

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post<RegisterResponse>(
                "http://localhost:3500/api/auth/register",
                formData
            );
            setSuccessMessage(response.data.message || "Registration successful!");
            setToken(response.data.token || null);
            setFormData({ fullName: "", email: "", password: "" });
        } catch (error: any) {
            setErrorMessage(error.response?.data?.error || "Error during registration");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            <form className="space-y-4" onSubmit={handleRegister}>
                <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    type="text"
                    className="w-full input input-bordered"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    type="email"
                    className="w-full input input-bordered"
                />
                <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    type="password"
                    className="w-full input input-bordered"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full btn btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            {token && <p className="text-blue-600 mt-4">Your token: {token}</p>}
        </div>
    );
};

export default Register;
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "../../../utils/axiosInstance";

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

    const handleRegister = async (e: React.FormEvent) => {
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
            const response = await axiosInstance.post<RegisterResponse>('auth/register', {
                ...formData,
                recaptchaToken,
            });

            setSuccessMessage(response.data.message || "Registration successful!");
            setFormData({ fullName: "", email: "", password: "" });
            setRecaptchaToken(null);
            recaptchaRef.current?.reset();
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
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
                    ref={recaptchaRef}
                    onChange={handleReCAPTCHA}
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
        </div>
    );
};

export default Register;
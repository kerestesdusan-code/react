import React, { useState } from "react";
import axios from "axios";

interface RegisterResponse {
    message: string;
}

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post<RegisterResponse>(
                "http://localhost:3500/api/register",
                { fullName, email, password });

            alert(response.data.message || "Registration successfull!");
        } catch (error: any) {
            alert(error.response?.data?.error || "Error during Registration");
        }
    };

    return (
        <div className="register-page">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="mb-2 p-2 border rounded w-full
                "/>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-2 p-2 border rounded w-full"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="mb-4 p-2 border rounded w-full"
            />
            <button
                onClick={handleRegister}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Register
            </button>
        </div>
    );
};

export default Register;

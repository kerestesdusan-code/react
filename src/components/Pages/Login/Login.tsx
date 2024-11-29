import React, { useState } from "react";
import axios from "axios";

interface LoginResponse {
    token: string;
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post<LoginResponse>("http://localhost:3500/api/login", { email, password });

            alert("Login successful: " + response.data.token);
        } catch (error: any) {
            alert(error.response?.data?.error || "Login Error");
        }
    };


    return (
        <div className="login-page">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
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
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Logi In
            </button>
        </div>
    );
};

export default Login;

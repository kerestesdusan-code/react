import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpButton = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
            Sign Up
        </button>
    );
};

export default SignUpButton;

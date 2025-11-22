import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "../../../utils/axiosInstance";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface FormElementProps {
    name: keyof ContactFormData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    type?: "text" | "email";
    rows?: number;
}

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

const Input = ({ name, value, onChange, placeholder, type = "text" }: FormElementProps) => (
    <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="mt-1 block w-full input input-bordered"
    />
);

const TextArea = ({ name, value, onChange, placeholder, rows = 6 }: FormElementProps) => (
    <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="mt-1 block w-full input input-bordered"
    />
);

const Button = ({ onClick, disabled, children }: ButtonProps & { onClick?: () => void }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full btn btn-primary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
        {children}
    </button >
);

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
        });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
            const response = await axiosInstance.post("/auth/contact", {
                ...formData,
                recaptchaToken,
            });
            setSuccessMessage("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            setRecaptchaToken(null);
        } catch (error) {
            setErrorMessage("Failed to send the message. Please try again.");
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
                <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    type="email"
                />
                <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here"
                />
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
                    ref={recaptchaRef}
                    onChange={handleReCAPTCHA}
                />
                <Button disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
            </form>
            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
    );
};

export default ContactForm;

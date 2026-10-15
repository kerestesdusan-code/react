import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormElementProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
};

type TextAreaProps = FormElementProps & {
  rows?: number;
};

type ButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
};

const Input = ({ name, value, onChange, placeholder }: FormElementProps) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="mt-1 block w-full input input-bordered"
    required
  />
);

const TextArea = ({ name, value, onChange, placeholder, rows = 6 }: TextAreaProps) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="mt-1 block w-full textarea textarea-bordered"
    required
  />
);

const Button = ({ disabled, children }: ButtonProps) => (
  <button type="submit" disabled={disabled} className="btn btn-primary w-full">
    {children}
  </button>
);

const ContactForm: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // reCAPTCHA v3 token
      if (!executeRecaptcha) {
        setError("reCAPTCHA is not ready. Please try again.");
        return;
      }
      const recaptchaToken = await executeRecaptcha("contact_form");

      await axiosInstance.post("/auth/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptchaToken,
      });

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <div>
        <label className="label">
          <span className="label-text">Full name</span>
        </label>
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <Input name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Message</span>
        </label>
        <TextArea name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." />
      </div>

      {error && <p className="text-error text-sm">{error}</p>}
      {success && <p className="text-success text-sm">Message sent successfully.</p>}

      <Button disabled={loading}>{loading ? "Sending..." : "Send message"}</Button>
    </form>
  );
};

export default ContactForm;

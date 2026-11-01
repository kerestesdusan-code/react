import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

type VerificationStatus = "loading" | "success" | "error";

export default function Verify() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  const verificationStarted = useRef(false);

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("The verification link is missing a token or email address.");
      return;
    }

    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get<{ message: string }>(
          "/auth/verify",
          {
            params: {
              token,
              email,
            },
          }
        );

        setStatus("success");
        setMessage(response.data.message);
      } catch {
        setStatus("error");
        setMessage("The verification link is invalid or has expired.");
      }
    };

    void verifyEmail();
  }, [token, email]);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Email verification</h1>

      {status === "loading" && (
        <p className="text-gray-600">{message}</p>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <p className="text-green-600">{message}</p>

          <Link to="/login" className="btn btn-primary">
            Continue to login
          </Link>
        </div>
      )}

      {status === "error" && (
        <p className="text-red-600">{message}</p>
      )}
    </div>
  );
}
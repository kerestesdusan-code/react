import axios from "axios";
import { response } from "express";

export const verifyRecaptcha = async (token: string): Promise<boolean> => {
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        if (!secretKey) {
            console.error("RECAPTCHA_SECRET_KEY is missing in .env");
            return false;
    }

        if (!token) {
            console.error("Recaptcha token is missing");
            return false;
        }

        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

        const response = await axios.post(
            verifyUrl,
            null,
            {
                params: {
                    secret: secretKey,
                    response: token,
                }
            }
        );

        return response.data.success === true;
    } catch (error) {
        console.error("Error verifing reCAPTCHA", error);
        return false;
    }
};
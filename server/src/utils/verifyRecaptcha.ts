import axios from "axios";

<<<<<<< HEAD
export type RecaptchaResult = {
  ok: boolean;
  hostname?: string;
  errorCodes?: string[];
  action?: string;
  score?: number;
};
=======
export const verifyRecaptcha = async (token: string | null): Promise<boolean> => {
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
>>>>>>> 8622f51 (features: stable backend, groups, modified users, auth, jwt validation)

export const verifyRecaptcha = async (
  token?: string,
  remoteIp?: string
): Promise<RecaptchaResult> => {
  // možnosť úplne vypnúť recaptcha (napr. lokálne)
  if (process.env.RECAPTCHA_DISABLED === "true") {
    return { ok: true };
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("[recaptcha] Missing RECAPTCHA_SECRET_KEY in .env");
    return { ok: false };
  }

  if (!token) {
    console.error("[recaptcha] Missing token");
    return { ok: false };
  }

  try {
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const resp = await axios.post(
      verifyUrl,
      null,
      {
        params: {
          secret: secretKey,
          response: token,
          remoteip: remoteIp,
        },
        timeout: 5000,
      }
    );

    const data = resp.data;

    if (!data?.success) {
      console.log("[recaptcha_fail]", {
        hostname: data?.hostname,
        errorCodes: data?.["error-codes"],
        action: data?.action,
        score: data?.score,
      });

      return {
        ok: false,
        hostname: data?.hostname,
        errorCodes: data?.["error-codes"],
        action: data?.action,
        score: data?.score,
      };
    }

    console.log("[recaptcha_ok]", {
      hostname: data?.hostname,
      action: data?.action,
      score: data?.score,
    });

    return {
      ok: true,
      hostname: data?.hostname,
      action: data?.action,
      score: data?.score,
    };
  } catch (error: any) {
    console.error("[recaptcha_error]", error?.message || error);
    return { ok: false };
  }
};

<<<<<<< HEAD
=======
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

        console.log("reCAPTCHA response:", response.data);
        
        return response.data.success === true; 
    } catch (error) {
        console.error("Error verifing reCAPTCHA", error);
        return false;
    }
};
>>>>>>> 8622f51 (features: stable backend, groups, modified users, auth, jwt validation)

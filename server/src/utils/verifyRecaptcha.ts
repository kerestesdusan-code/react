import axios from "axios";

export async function verifyRecaptcha(
  token?: string,
  remoteIp?: string
): Promise<boolean> {
  const enabled = process.env.RECAPTCHA_ENABLED === "true";
  if (!enabled) return true;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("[recaptcha] Missing RECAPTCHA_SECRET_KEY");
    return false;
  }

  if (!token) {
    console.error("[recaptcha] Missing token");
    return false;
  }

  try {
    const resp = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
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

    return resp.data?.success === true;
  } catch (err: any) {
    console.error("[recaptcha_error]", err?.message || err);
    return false;
  }
}

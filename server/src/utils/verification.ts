import crypto from "crypto";

export function generateVerificationToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hash };
}

export function hashVerificationToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

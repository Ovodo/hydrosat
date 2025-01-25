export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://hydrosat.vercel.app"
    : "http://localhost:8000";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://hydrosa.vercel.app"
    : "http://localhost:3000";

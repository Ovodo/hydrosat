import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  const jwt = (await cookies()).get("jwt") as RequestCookie;
  const user = (await cookies()).get("user") as RequestCookie;

  try {
    if (jwt && user) {
      const { payload } = await jwtVerify(jwt.value, encodedKey, {
        algorithms: ["HS256"],
      });
      return user.value;
    }
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

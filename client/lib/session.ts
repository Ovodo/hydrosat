import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function decrypt() {
  const user = (await cookies()).get("user") as RequestCookie;

  try {
    if (user) {
      return user.value;
    }
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

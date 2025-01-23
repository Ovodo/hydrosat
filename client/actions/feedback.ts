"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createFeedback = async ({ text }: { text: string }) => {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/auth/signin");
    return;
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback`,
      {
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getFeedbacks = async () => {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    redirect("/auth/signin");
    return;
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/feedback`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

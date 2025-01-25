"use server";

import { backendUrl } from "@/lib/config";
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
      `${backendUrl}/api/feedback`,
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
      `${backendUrl}/api/feedback`,

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

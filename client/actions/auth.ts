"use server";
import { cookies } from "next/headers";
import axios from "axios";
import { redirect } from "next/navigation";

export const signUp = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth/signup", {
      name,
      password,
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const signIn = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  try {
    const res = await axios.post("http://localhost:8000/api/auth/signin", {
      name,
      password,
    });
    const { token, ...rest } = res.data;
    (await cookies()).set("jwt", token);
    (await cookies()).set("user", JSON.stringify(rest));
    console.log(rest);
    return rest;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const signOut = async () => {
  (await cookies()).delete("jwt");
  redirect("/auth/signin");
};

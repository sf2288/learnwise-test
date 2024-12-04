"use server";

import { CONSTANTS } from "@/utils/constants";
import { deleteServerCookie, setServerCookie } from "@/utils/server-cookie";
interface ICommon {
  status?: number;
  body?: { error?: string };
}
interface LoginState extends ICommon {
  isAuthenticated: boolean;
  message: string;
}

export const LoginAction = async (
  state: LoginState | { status: number; body: { error: string } },
  data: FormData
): Promise<LoginState> => {
  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const isAuthenticated =
      email === CONSTANTS.ADMIN_EMAIL && password === CONSTANTS.ADMIN_PASSWORD;

    if (isAuthenticated) {
      await setServerCookie(CONSTANTS.TOKEN_KEY_NAME, "true", {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000),
      });
    }

    return {
      isAuthenticated,
      message: !isAuthenticated ? "Invalid Credentials" : "",
    };
  } catch (error) {
    console.log("Unexpected error in LoginAction:", error);
    return {
      isAuthenticated: false,
      message: "Failed to login",
      status: 500,
      body: { error: "An unexpected error occurred" },
    };
  }
};

export const LogoutAction = async () => {
  try {
    await deleteServerCookie(CONSTANTS.TOKEN_KEY_NAME);
  } catch (e: unknown) {
    console.error("Unexpected error in logoutAction catch", e);
    return {
      status: 500,
      body: { error: "An unexpected error occurred" },
    };
  }
};

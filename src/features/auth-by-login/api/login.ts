import type { LoginFormValues } from "../model/schema";
import type { LoginResponse } from "../model/types";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));


export async function loginApi(_data: LoginFormValues): Promise<LoginResponse> {
  await delay(600);

  const flagKey = "__fake_login_attempted__";

  const tried = typeof window !== "undefined" ? localStorage.getItem(flagKey) : "1";

  if (!tried) {
    localStorage.setItem(flagKey, "1");
    throw new Error("Invalid credentials");
  }

  const token = "fake." + Math.random().toString(36).slice(2);
  return {
    token,
    user: { id: "1", name: "Demo User" },
  };
}

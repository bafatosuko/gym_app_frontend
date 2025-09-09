import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string().regex(
    /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/,
    "Password must be 8+ chars, with upper, lower, number, and special char"
  ),
});

export type LoginFields = z.infer<typeof loginSchema>;

export type AuthResponse = {
  firstname: string;
  lastname: string;
  token: string;
  role: "CUSTOMER" | "TRAINER" | "ADMIN";
};

export async function login({
                              username,
                              password,
                            }: LoginFields): Promise<AuthResponse> {
  const res = await fetch(import.meta.env.VITE_API_URL + "auth/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    let detail = "Login Failed.";

    try {
      const data = await res.json();
      if (typeof data?.detail == "string") detail = data.detail;
    } catch (error) {
      console.error(error);
    }

    const err: any = new Error(detail);
    err.status = res.status;
    throw err;

  }
  return await res.json();
}


import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string()
    .regex(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/,
      "Password must be 8+ chars, with upper, lower, number, and special char"
    ),
  confirmPassword: z.string(),
  lastname: z.string().min(2, "Surname is too short"),
  firstname: z.string().min(2, "Name is too short"),
  dateOfBirth: z.string().nonempty("Date of Birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFields = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterFields): Promise<void> {
  // Αφαιρούμε το confirmPassword πριν στείλουμε στο backend
  const { confirmPassword, ...payload } = data;

  const res = await fetch(import.meta.env.VITE_API_URL + "users/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "Registration failed.";
    try {
      const errData = await res.json();
      if (typeof errData?.detail === "string") detail = errData.detail;
    } catch (error) {
      console.error(error);
    }
    throw new Error(detail);
  }
}
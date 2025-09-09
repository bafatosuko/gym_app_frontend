
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string()
    .regex(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[@#$!%&*]).{8,}$/,
      "Password must be 8+ chars, with upper, lower, number, and special char"
    ),
  confirmPassword: z.string() ,
  lastname: z.string().min(2, "Surname is too short"),
  firstname: z.string().min(2, "Name is too short"),
  dateOfBirth: z.string().refine((val) => {
    const dob = new Date(val);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    return dob <= minDate;
  }, {
    message: "User must be at least 10 years old",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Gender is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFields = z.infer<typeof registerSchema>

export type RegisterPayload = Omit<RegisterFields, "confirmPassword">;

export async function registerUser(data: RegisterPayload): Promise<void> {
  // Αφαιρούμε το confirmPassword πριν στείλουμε στο backend


  const res = await fetch(import.meta.env.VITE_API_URL + "users/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
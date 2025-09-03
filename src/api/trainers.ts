

import {authHeaders} from "@/api/auth.ts";

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  dateOfBirth: string;
  role: string;
  gender: string;
};



export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(import.meta.env.VITE_API_URL + "users/trainer/all", {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  const data: User[] = await res.json();
  return data.filter((u) => u.role !== "ADMIN");
}

export async function deleteUser(userId: number): Promise<void> {
  const res = await fetch(import.meta.env.VITE_API_URL + `users/trainer/${userId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete user");
}

export async function promoteUser(userId: number): Promise<void> {
  const res = await fetch(
    import.meta.env.VITE_API_URL + `users/trainer/${userId}`,
    {
      method: "PUT",
      headers: authHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to promote user");
}

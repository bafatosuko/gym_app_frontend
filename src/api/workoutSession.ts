
import {authHeaders} from "@/api/auth.ts";

export type WorkoutSession = {
  id: number;
  title: string;
  description: string;
  sessionDate: string;
  startTime: string;
  capacity: number;
  availableSlots?: number;
  isPast?: boolean;
  trainer?: any;
};





// Fetch όλα τα sessions (για trainer)
export const fetchAllSessions = async (): Promise<WorkoutSession[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/all`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch sessions");
  return res.json();
};

// Create νέο session
export const createSession = async (session: Partial<WorkoutSession>): Promise<WorkoutSession> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(session),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json();
};

// Update υπάρχον session
export const updateSession = async (id: number, session: Partial<WorkoutSession>): Promise<WorkoutSession> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(session),
  });
  if (!res.ok) throw new Error("Failed to update session");
  return res.json();
};

// Delete session
export const deleteSession = async (id: number): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete session");
};
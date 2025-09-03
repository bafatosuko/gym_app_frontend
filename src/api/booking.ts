import {authHeaders} from "@/api/auth.ts";

export interface WorkoutSession {
  id: number
  title: string
  description: string
  sessionDate: string
  startTime: string
}

export interface Booking {
  id: number
  bookingTime: string
  isCancelled: boolean
  workoutSession: WorkoutSession
}

export const fetchMyBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}bookings/my`, {
    headers: authHeaders(),
  })

  if (!res.ok) throw new Error("Failed to fetch bookings")
  return res.json()
}

import {authHeaders} from "@/api/auth.ts";




export type Program = {
  id: number
  title: string                   //"WOD" | "INTRO" | "STRENGTH"
  startTime: string
  availableSlots: number
  capacity: number
  bookingId?: number
  disabled?: boolean
  past?: boolean
}





// Fetch sessions για συγκεκριμένη ημερομηνία
export const fetchSessionsByDate = async (date: string): Promise<Program[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions?date=${date}`, {
    headers: authHeaders(),
  })

  if (!res.ok) throw new Error("Failed to fetch sessions")
  return res.json()
}

// Κάνε booking για session
export const createBooking = async (workoutSessionId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}bookings`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ workoutSessionId }),
  })
  // console.log(res)
  if (!res.ok) throw new Error("Failed to create booking")
  return res.json()
}

// Ακύρωση booking
export const cancelBooking = async (bookingId: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}bookings/cancel/${bookingId}`, {
    method: "POST",
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error("Failed to cancel booking")
  return true
}



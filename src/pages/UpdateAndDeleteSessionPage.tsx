import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authHeaders } from "@/api/auth"
import {toast} from "sonner";

const sessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sessionDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format yyyy-MM-dd"),
  startTime: z.string().min(1, "Start time is required"),
  capacity: z.number().min(5, "Capacity needs to be greater than 5"),
})

type SessionFormData = z.infer<typeof sessionSchema>

type WorkoutSession = {
  id: number
  title: string
  description: string
  sessionDate: string // ISO string από backend
  startTime: string
  capacity: number
}

const UpdateAndDeleteSessionPage = () => {
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [editingSession, setEditingSession] = useState<WorkoutSession | null>(null)
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
  })

  //  Fetch all sessions
  const fetchSessions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/all`, {
        headers: authHeaders(),
      })
      if (!res.ok) {
        const error = await res.text()
        throw new Error(`Failed to fetch sessions: ${error}`)
      }
      const data = await res.json()
      setSessions(data)
      console.log("Sessions fetched:", data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  // Update
  const onSubmit = async (values: SessionFormData) => {
    if (!editingSession) return

    // Μετατροπή date σε string "yyyy-MM-dd" ΔΕΝ ΧΡΕΙΑΖΕΤΑΙ!!!!
    const payload = {
      ...values,
      //sessionDate: values.sessionDate.toISOString().split("T")[0],
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/${editingSession.id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      alert("❌ Failed to update session")
      return
    }

    setOpen(false)
    setEditingSession(null)
    toast.success("Session  has been updated successfully.")
    await fetchSessions()
  }

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Είσαι σίγουρος ότι θες να διαγράψεις το session;")) return
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}workout-sessions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
      if (!res.ok) throw new Error("Failed to delete session")
      setSessions((prev) => prev.filter((s) => s.id !== id))
      toast.success(`Session με  id:${id} διαγράφτηκε  επιτυχώς`)
    } catch (err) {
      toast.error(err + "Το session δεν διαγράφτηκε")
      console.error(err)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage Workout Sessions</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="shadow-lg">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{session.title}</h2>
              <p className="text-sm text-gray-600">{session.description}</p>
              <p className="text-sm text-gray-600">Capacity: {session.capacity}</p>
              <p className="text-sm">
                📅 {format(new Date(session.sessionDate), "PPP")} <br />
                ⏰ {session.startTime}
              </p>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingSession(session)
                    reset({
                      ...session,
                      //sessionDate: new Date(session.sessionDate),
                    })
                    setOpen(true)
                  }}
                >
                  Update
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(session.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Update Session */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Session</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input {...register("title")} />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <Label>Description</Label>
              <Input {...register("description")} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" {...register("sessionDate")} />
              {errors.sessionDate && <p className="text-red-500 text-sm">{errors.sessionDate.message}</p>}
            </div>
            <div>
              <Label>Capacity</Label>
              <Input type="number" {...register("capacity", { valueAsNumber: true })} />
            </div>
            <div>
              <Label>Start Time</Label>
              <Input type="time" {...register("startTime")} />
            </div>

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateAndDeleteSessionPage

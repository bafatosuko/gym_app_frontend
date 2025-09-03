import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createSession, updateSession } from "@/api/workoutSession"
import { format } from "date-fns"
import { Link } from "react-router-dom"


const workoutSessionSchema = z.object({
  title: z.string().min(1, "Ο τίτλος είναι υποχρεωτικός"),
  description: z.string().min(5, "Η περιγραφή πρέπει να έχει τουλάχιστον 5 χαρακτήρες"),
  sessionDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date({ required_error: "Η ημερομηνία είναι υποχρεωτική" })
  ),
  startTime: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Μη έγκυρη ώρα (HH:mm)"),
  capacity: z.number().min(5, "Η χωρητικότητα πρέπει να είναι τουλάχιστον 5"),
})

type WorkoutSessionForm = z.infer<typeof workoutSessionSchema>

type WorkoutSessionPageProps = {
  sessionToEdit?: WorkoutSessionForm & { id: number }
}

export const CreateSessionPage: React.FC<WorkoutSessionPageProps> = ({ sessionToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutSessionForm>({
    resolver: zodResolver(workoutSessionSchema),
    defaultValues: sessionToEdit
      ? { ...sessionToEdit }
      : {
        title: "WOD",
        description: "Workout Of the Day",
        sessionDate: new Date(),
        startTime: "08:00",
        capacity: 15,
      },
  })


  const onSubmit: SubmitHandler<WorkoutSessionForm> = async (data) => {
    try {
      if (sessionToEdit) {
        await updateSession(sessionToEdit.id, data)
        toast.success("Session ενημερώθηκε επιτυχώς")
      } else {
        await createSession(data)
        toast.success("Session δημιουργήθηκε επιτυχώς")
      }
    } catch (err: any) {
      toast.error(err.message || "Σφάλμα δημιουργίας/ενημέρωσης")
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {sessionToEdit ? "Edit Session" : "Create Session"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Τίτλος</Label>
          <Input {...register("title")} placeholder="Τίτλος" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <Label>Περιγραφή</Label>
          <Input {...register("description")} placeholder="Περιγραφή session" />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label>Ημερομηνία</Label>
          <Input
            type="date"
            {...register("sessionDate")}
            min={format(new Date(), "yyyy-MM-dd")}
          />
          {errors.sessionDate && (
            <p className="text-red-600 text-sm">{errors.sessionDate.message?.toString()}</p>
          )}
        </div>

        <div>
          <Label>Ώρα Έναρξης (HH:mm)</Label>
          <Input type="time" {...register("startTime")} />
          {errors.startTime && (
            <p className="text-red-600 text-sm">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <Label>Χωρητικότητα</Label>
          <Input type="number" {...register("capacity", { valueAsNumber: true })} />
          {errors.capacity && (
            <p className="text-red-600 text-sm">{errors.capacity.message}</p>
          )}
        </div>

        <Button type="submit">{sessionToEdit ? "Ενημέρωση" : "Δημιουργία"}</Button>
      </form>

      <Link to="/manage_sessions" className="hover:text-red-500 font-medium block mt-4">
        Update And Delete Sessions
      </Link>
    </div>
  )
}

export default CreateSessionPage

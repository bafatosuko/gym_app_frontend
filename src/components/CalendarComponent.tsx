import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { format } from "date-fns"
import { el } from "date-fns/locale"
import { toast } from "sonner"
import {
  fetchSessionsByDate,
  createBooking,
  cancelBooking,
  type Program
} from "@/api/calendar.ts"

const getBackgroundColor = (title: Program["title"]) => {
  switch (title) {
    case "WOD": return "bg-red-100 border-red-300"
    case "INTRO": return "bg-blue-100 border-blue-300"
    case "STRENGTH": return "bg-green-100 border-green-300"
    default: return "bg-gray-100 border-gray-300"
  }
}

const  CalendarComponent =()=> {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [programsByDate, setProgramsByDate] = React.useState<Record<string, Program[]>>({})
  const selectedDateKey = date ? format(date, "yyyy-MM-dd") : ""

  const fetchPrograms = async (dateKey: string) => {
    try {
      const programs = await fetchSessionsByDate(dateKey);
      setProgramsByDate(prev => ({ ...prev, [dateKey]: programs }));
      console.log(programs);
    } catch {
      setProgramsByDate(prev => ({ ...prev, [dateKey]: [] }));
    }
  };

  React.useEffect(() => {
    if (date) fetchPrograms(selectedDateKey);
  }, [date]);


  React.useEffect(() => {
    if (date) fetchPrograms(selectedDateKey)
  }, [date])

  const handleCheckIn = async (program: Program) => {
    try {
      await createBooking(program.id)
      console.log(program)
      toast.success("Επιτυχής check-in")
      fetchPrograms(selectedDateKey)
    } catch {
      toast.error("Αποτυχία check-in")
    }
  }

  const handleCancelCheckIn = async (program: Program) => {
    if (!program.bookingId) return
    try {
      await cancelBooking(program.bookingId)
      toast.success("Check-in ακυρώθηκε")
      fetchPrograms(selectedDateKey)
    } catch(err) {
      toast.error("Αποτυχία ακύρωσης" + err.message)
    }
  }



  return (
    <div className="p-4 space-y-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border text-xl"
        locale={el}
        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
      />

      {date && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(programsByDate[selectedDateKey] || []).map(program => {
            const isFull = program.availableSlots <= 0;
            //const now = new Date()
            const [hour, minute] = program.startTime ? program.startTime.split(":").map(Number) : [0, 0];
            const sessionDateTime = new Date(date!)
            sessionDateTime.setHours(hour, minute, 0, 0)
            const isPast = program.past;
            const isUserCheckedIn = !!program.bookingId


            return (
              <Card key={program.id} className={`p-4 border ${getBackgroundColor(program.title)}`}>
                <CardTitle className="text-lg font-bold">{program.title} — {program.startTime}</CardTitle>
                <CardContent>
                  <p>Συμμετοχές: {program.capacity - program.availableSlots}/{program.capacity}</p>
                  <Button
                    onClick={() => isUserCheckedIn ? handleCancelCheckIn(program) : handleCheckIn(program)}
                    disabled={!isUserCheckedIn && (isFull || isPast) || program.disabled}
                  >
                    {isUserCheckedIn ? "Cancel Check-In" : isPast ? "Έληξε" : "Check In"}
                  </Button>
                  {isUserCheckedIn && <p className="text-sm text-green-700 mt-2">Έχεις κάνει check-in εδώ ✅</p>}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CalendarComponent
import { useEffect, useState } from "react"
import { fetchMyBookings, type Booking } from "@/api/booking.ts"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"


const BookingsPage = () => {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings()
        setBookings(data)

      } catch (err) {
        console.error("Error fetching bookings:", err)
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    )
  }

  if (bookings.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Δεν έχεις κρατήσεις ακόμα.</p>
  }

  console.log("bookings", bookings)

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Οι κρατήσεις μου</h1>
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          className={`rounded-2xl shadow-md ${
            booking.isCancelled
              ? "bg-gray-200 text-gray-500"
              : "bg-green-100 border border-green-400"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">
                  {booking.workoutSession.title}
                </h2>
                <p>
                  {booking.workoutSession.sessionDate} -{" "}
                  {booking.workoutSession.startTime}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  booking.isCancelled ? "bg-gray-400 text-white" : "bg-green-500 text-white"
                }`}
              >
                {booking.isCancelled ? "Cancelled" : "Active"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BookingsPage;
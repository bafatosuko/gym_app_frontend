import {BrowserRouter, Routes, Route} from "react-router";

import Layout from "./components/Layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import ClassesPage from "@/pages/ClassesPage.tsx";
import TrainersPage from "@/pages/TrainersPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import {Toaster} from "sonner";
import AuthProvider from "./context/AuthProvider.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import SubscriptionPage from "@/pages/SubscriptionPage.tsx";
import BookingsPage from "@/pages/BookingsPage.tsx";
import CreateSessionPage from "@/pages/CreateSessionPage.tsx";
import UpdateAndDeleteSessionPage from "@/pages/UpdateAndDeleteSessionPage.tsx";


function App() {





  return (
    <>
      <AuthProvider>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Layout/>} >
            <Route index element={<HomePage/>}/>


            {/* Μόνο authenticated */}
            <Route element={<ProtectedRoute />}>
              <Route path="/classes" element={<ClassesPage />} />
            </Route>

            {/* Μόνο TRAINER ή ADMIN */}
            <Route element={<ProtectedRoute roles={["TRAINER", "ADMIN"]} />}>
              <Route path="/trainers" element={<TrainersPage />} />
            </Route>

            <Route element={<ProtectedRoute roles={["TRAINER", "ADMIN"]} />}>
              <Route path="/manage_sessions" element={<UpdateAndDeleteSessionPage />} />
            </Route>

            <Route element={<ProtectedRoute roles={["TRAINER", "ADMIN"]} />}>
              <Route path="/createSession" element={<CreateSessionPage/>} />
            </Route>

            <Route element={<ProtectedRoute roles={["CUSTOMER", "ADMIN"]} />}>
              <Route path="/bookings" element={<BookingsPage />} />
            </Route>

            <Route path="/subscription" element={<SubscriptionPage/>}/>
            <Route path="/login"  element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>


          </Route>

        </Routes>
      </BrowserRouter>
        <Toaster richColors />
      </AuthProvider>

      </>
  )
}

export default App

import { Dumbbell } from "lucide-react";
import {Link} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";
import {Button} from "@radix-ui/themes";


const Header = () => {

  const { isAuthenticated, logoutUser, firstname, role } = useAuth();
  return (
    <>

      <header className="flex justify-between items-center px-6 py-4 bg-black text-white">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-extrabold text-red-500">
            WOD-CORE
          </Link>
          <Dumbbell className="w-7 h-7 text-white" />
        </div>

        <nav>
          <ul className="flex gap-6">
            <li><Link to="/" className="hover:text-red-500 font-medium">Αρχική</Link></li>
            <li><Link to="/classes" className="hover:text-red-500 font-medium">Προγράμματα</Link></li>
            <li><Link to="/trainers" className="hover:text-red-500 font-medium">Προπονητές</Link></li>

            {isAuthenticated && (role === "TRAINER" || role === "ADMIN") ? (
              <Link to="/createSession" className="hover:text-red-500 font-medium">
                Create a WorkoutSession
              </Link>) : (<></>)}

            {isAuthenticated && (role === "CUSTOMER" || role === "ADMIN") ? (
              <Link to="/bookings" className="hover:text-red-500 font-medium">
                Your Bookings
              </Link>) : (<></>)}
            {isAuthenticated ?(
              <li>
                <Link to="/subscription" className="hover:text-red-500 font-medium">
                  My Subscription
                </Link>
              </li>
            ) : (<></>)}

            {!isAuthenticated ? (
              <li>
                <Link to="/login" className="hover:text-red-500 font-medium">
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="font-medium text-red-400">
                  Καλώς ήρθες, {firstname}
                </li>
                <li className="hover:bg-red-500  hover:text-white">
                  <Button
                    variant="outline"
                    onClick={logoutUser}
                   // className="hover:bg-red-500 hover:border-red-500 hover:text-blue-500"
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>


    </>
  )
}

export default Header;
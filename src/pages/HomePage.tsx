import gymImage from "../assets/images/gym.png"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  }

  return(
    <>

      <>
        <div className="pt-20">


        <section className="w-full h-[120vh] -mt-20">
          <img
            src={gymImage}
            alt="CrossFit Gym"
            className="w-full h-full object-cover"
          />
        </section>

        {/* Gym Description */}
        <section className="bg-gray-900 text-white py-12 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Καλώς ήρθες στο WOD-CORE</h2>
          <p className="max-w-2xl mx-auto text-lg">
            Το WOD-CORE είναι ένα CrossFit γυμναστήριο για όσους ψάχνουν έντονη προπόνηση, λειτουργική ενδυνάμωση και
            μια δυνατή κοινότητα. Από αρχάριους μέχρι επαγγελματίες, έχουμε χώρο και υποστήριξη για όλους.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-black py-10 text-center">
          <h3 className="text-white text-2xl mb-4">Ξεκίνα σήμερα</h3>
          <button
            onClick={navigateToLogin}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition">
            Κάνε Sign In
          </button>
        </section>
        </div>
      </>






    </>
  )

}


export default HomePage;
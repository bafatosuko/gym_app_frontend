
const Footer = () => {

  return (<>

    <footer className="bg-black text-white px-6 py-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Power by */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-400">
            Powered by <span className="text-red-500 font-semibold">MyProtein</span>,{" "}
            <span className="text-red-500 font-semibold">Optimum Nutrition</span>,{" "}
            <span className="text-red-500 font-semibold">Dymatize</span>
          </p>
        </div>

        {/* Τοποθεσίες */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400">
            Παράρτημα σε: <span className="text-white font-semibold">Αθήνα</span> &{" "}
            <span className="text-white font-semibold">Θεσσαλονίκη</span>
          </p>
        </div>
      </div>

      {/* Optional: Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} WOD-CORE. All rights reserved.
      </div>
    </footer>


  </>)
}

export default Footer;
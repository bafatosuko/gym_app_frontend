
import Header from './Header';
import Footer from './Footer';
import {Outlet} from "react-router";

const Layout = () => {

  return (
    <>
      <Header/>
      <div className="container mx-auto min-h-[95vh] ">
        <Outlet/>
      </div>

      <Footer/>
    </>
  )
}

export default Layout;
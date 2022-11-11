import { Outlet } from "react-router-dom";

// components
import Navbar from "../screen/Navbar";
import Footer from "../screen/Footer";

export default function Boilerplate() {
  return (
    <section className="boilerplate">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
}

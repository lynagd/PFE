import Header from "../components/Header";
import Lwest from "../components/Lwest";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";

export default function Home() {
  return (
     <div className="bg-lfond min-h-screen">
      <Header />
      <Lwest />
       <hr className="my-8 border-t-2 border-khder w-[90%] mx-auto" />
      <Benefits />
      <Footer />
    </div>
  );
}

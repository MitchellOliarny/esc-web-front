import Image from "next/image";
import Header from "./components/Homepage/Header";
import OurRoadmap from "./components/Homepage/OurRoadmap";
import Footer from "./components/Footer";
import MainNavbar from "./components/MainNavbar";

export default function Home() {
  return (
    <main className="">
      <Header />
      <OurRoadmap />
    </main>
  );
}

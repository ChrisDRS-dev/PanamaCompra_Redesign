import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import News from "../components/News";
import Versions from "../components/Versions";
import Tools from "../components/Tools";
import Links from "../components/Links";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <News />
      <Versions />
      <Tools />
      <Links />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
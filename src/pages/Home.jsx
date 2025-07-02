import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import News from "../components/News";
import Versions from "../components/Versions";
import Tools from "../components/Tools";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <News />
      <Versions />
      <Tools />
    </div>
  );
};

export default Home; 
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Snavbar from "./components/Snavbar";
import Live from "./components/Live";

const LivePage = () => {
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Snavbar />
      <Live/>
    </div>
  );
};

export default LivePage;

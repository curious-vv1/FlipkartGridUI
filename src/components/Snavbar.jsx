import React from 'react';
import { Link } from 'react-router-dom';

const Snavbar = () => {
  return (
    <div className="p-2 flex justify-center items-center">
      <Link to="/" className="bg-white text-blue-600 font-bold py-1 px-4 rounded mx-2 shadow-md hover:bg-blue-100">Home</Link>
      <Link to="/live" className="bg-white text-blue-600 font-bold py-1 px-4 rounded mx-2 shadow-md hover:bg-blue-100">Live Feed</Link>

      <Link to="/fruits&Veg" className="bg-white text-blue-600 font-bold py-1 px-4 rounded mx-2 shadow-md hover:bg-blue-100">Fruits & Vegetable</Link>
    </div>
  );
};

export default Snavbar;
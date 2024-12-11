import React, { useState, useEffect } from "react";
import { getDatabase, ref, query, limitToLast, get } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductInfo from "./components/ProductInfo";
import Snavbar from "./components/Snavbar";

const HomePage = () => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [productData, setProductData] = useState(null);
  const [resetProductInfo, setResetProductInfo] = useState(false);

  useEffect(() => {
    getLastObject();
  }, []);

  const getLastObject = async () => {
    try {
      const auth = getAuth();
      const db = getDatabase();

      console.log("Attempting to authenticate...");
      await signInAnonymously(auth);
      console.log("Authentication successful");

      console.log("Attempting to fetch last object...");
      const productDataRef = ref(db);
      console.log("Database reference created:", productDataRef.toString());

      const lastProductQuery = query(productDataRef, limitToLast(1));
      console.log("Query created");
      console.log(lastProductQuery);

      const snapshot = await get(lastProductQuery);
      console.log("Query executed. Snapshot exists:", snapshot.exists());

      if (snapshot.exists()) {
        const lastProduct = Object.values(snapshot.val())[0];
        console.log("Last object:", lastProduct);
        setProductData(lastProduct);
      } else {
        console.log("No data available in the specified path");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCameraStateChange = (isCameraOn) => {
    if (!isCameraOn) {
      setShowProductInfo(false);
    }
  };

  const handleVideoEnd = (ended) => {
    setIsVideoEnded(ended);
    setShowProductInfo(ended);
    setResetProductInfo(false);
  };

  const handleMotorStart = () => {
    setResetProductInfo(true);
    setShowProductInfo(false);
    setIsVideoEnded(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Snavbar />
      <div className="flex-grow p-4 overflow-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <Home
            onCameraStateChange={handleCameraStateChange}
            onVideoEnd={handleVideoEnd}
            onMotorStart={handleMotorStart}
          />
          <div className="space-y-4">
            {showProductInfo && isVideoEnded && productData && (
              <ProductInfo
                productData={productData}
                videoEnded={isVideoEnded}
                reset={resetProductInfo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

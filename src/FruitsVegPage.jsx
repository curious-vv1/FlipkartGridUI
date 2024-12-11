import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Snavbar from "./components/Snavbar";
import ProductInfo from "./components/ProductInfo";
import FruitsVeg from "./components/Fruits&Veg";

const FruitsVegPage = () => {
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [productData, setProductData] = useState(null);
  const [resetProductInfo, setResetProductInfo] = useState(false);

  useEffect(() => {
    getLastObject();
  }, []);

  const getLastObject = () => {
    try {
      console.log("Setting dummy product data...");
      const dummyData = {
        product_info: {
          "Sl no": 1,
          Timestamp: "2024-12-11T12:00:00Z",
          Product: "Potato",
          Freshness: 4,
          "Expected life span (Days)": 3,
          "Sl no.": 2,
          TimeStamp: "2024-12-11T12:00:00Z",
          product: "Tomato",
          freshness: 7,
          "Expected life span(Days)": 2,
        },
      };

      console.log("Dummy data set:", dummyData);
      setProductData(dummyData);
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
          <FruitsVeg
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

export default FruitsVegPage;

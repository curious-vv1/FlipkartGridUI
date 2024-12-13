import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Snavbar from "./components/Snavbar";

const LivePage = () => {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  useEffect(() => {
    // Fetch available video input devices
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId); // Default to the first device
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getDevices();
  }, []);

  const startCamera = async () => {
    if (!selectedDeviceId) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDeviceId },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraStarted(true);
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraStarted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Snavbar />
      <div className="p-2 flex justify-center items-center">
        <div>
          <label htmlFor="camera-select">Select Camera: </label>
          <select
            id="camera-select"
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            value={selectedDeviceId}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="bg-white text-blue-600 font-bold py-1 px-4 rounded mx-2 shadow-md hover:bg-blue-100"
            onClick={startCamera}
            disabled={isCameraStarted}
          >
            Start Camera
          </button>
          <button
            className="bg-white text-blue-600 font-bold py-1 px-4 rounded mx-2 shadow-md hover:bg-blue-100"
            onClick={stopCamera}
            disabled={!isCameraStarted}
            style={{ marginLeft: "10px" }}
          >
            Stop Camera
          </button>
        </div>
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxHeight: "500px", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LivePage;

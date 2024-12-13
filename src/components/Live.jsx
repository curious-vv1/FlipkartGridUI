import React, { useState, useRef, useEffect } from "react";

const Live = () => {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);

  const requestCameraPermission = async () => {
    try {
      // Request camera access first
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      // If successful, fetch available devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      
      setDevices(videoDevices);
      setCameraPermission(true);
      
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraPermission(false);
      alert("Camera access was denied. Please check your permissions.");
    }
  };

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
      console.error("Error starting camera:", error);
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
    <div className="p-4 flex flex-col items-center">
      {!cameraPermission ? (
        <button 
          onClick={requestCameraPermission}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Request Camera Access
        </button>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="camera-select" className="mr-2">Select Camera:</label>
            <select
              id="camera-select"
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              value={selectedDeviceId}
              className="border rounded py-1 px-2"
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mr-2 disabled:opacity-50"
              onClick={startCamera}
              disabled={isCameraStarted}
            >
              Start Camera
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded disabled:opacity-50"
              onClick={stopCamera}
              disabled={!isCameraStarted}
            >
              Stop Camera
            </button>
          </div>
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-h-[500px] mt-4"
          />
        </>
      )}
    </div>
  );
};

export default Live;
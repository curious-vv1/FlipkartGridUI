import React, { useState, useRef, useEffect } from 'react'
import videoSrc from '../assets/5.mp4'

const Home = ({ onCameraStateChange, onVideoEnd }) => {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.addEventListener('ended', handleVideoEnd)
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [])

  const handleVideoEnd = () => {
    setIsVideoEnded(true)
    onVideoEnd(true)
  }

  const handleCameraToggle = () => {
    if (videoRef.current) {
      if (isCameraOn) {
        turnCameraOff()
      } else {
        turnCameraOn()
      }
    }
  }

  const turnCameraOn = () => {
    setIsLoading(true)
    setTimeout(() => {
      videoRef.current.play()
      setIsCameraOn(true)
      setIsLoading(false)
      setIsVideoEnded(false)
      onCameraStateChange(true)
      onVideoEnd(false)
    }, 1000)
  }

  const turnCameraOff = () => {
    videoRef.current.pause()
    setIsCameraOn(false)
    setIsVideoEnded(false)
    onCameraStateChange(false)
    onVideoEnd(false)
    setTimeout(() => {
      videoRef.current.currentTime = 0;
    }, 100);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-2 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-grow overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <video 
          ref={videoRef}
          className={`w-full h-full object-contain ${!isCameraOn ? 'invisible' : ''}`}
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          className="px-4 py-2 text-sm text-white transition-colors duration-300 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          onClick={handleCameraToggle}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
        </button>
      </div>
    </div>
  )
}

export default Home

import React, { useState, useEffect } from 'react'

const ProductInfo = ({ productData, videoEnded }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const allData = Object.entries(productData.product_info)

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prevProgress + 3.75; // 100% / 8 seconds / 10 updates per second
      });
    }, 1000); // Update every 100ms for smoother animation

    return interval;
  };

  useEffect(() => {
    const interval = startLoading();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoEnded) {
      const interval = startLoading();
      return () => clearInterval(interval);
    }
  }, [videoEnded]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Loading: {Math.round(progress)}%
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-2 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-grow overflow-auto">
        <table className="w-full text-sm">
          <tbody>
            {allData.map(([key, value], index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-1 px-2 font-semibold">{key}</td>
                <td className="py-1 px-2">{value || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductInfo

import React, { useState, useEffect } from 'react'

const ProductInfo = ({ productData, videoEnded }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const allData = Object.entries(productData.product_info)

  useEffect(() => {
    // Show skeleton for 3 seconds when component mounts
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoEnded) {
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [videoEnded]);

  if (showSkeleton) {
    return (
      <div className="bg-white rounded-lg shadow-md p-2 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-grow overflow-auto">
          <table className="w-full text-sm">
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-1 px-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="py-1 px-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

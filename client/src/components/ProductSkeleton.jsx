import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className="animate-pulse bg-white p-3 rounded-lg shadow w-full max-w-[220px] h-[300px]">
            <div className="bg-gray-300 h-[210px] w-full rounded mb-4" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
        </div>
    )
}

export default ProductSkeleton

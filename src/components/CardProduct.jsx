import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { valideURLConvert } from '../utils/valideURLConvert'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  const url = `/product/${data?._id}`
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }


        @keyframes wiggle {
          0%, 7% {
            transform: rotateZ(0);
          }
          15% {
            transform: rotateZ(-15deg);
          }
          20% {
            transform: rotateZ(10deg);
          }
          25% {
            transform: rotateZ(-10deg);
          }
          30% {
            transform: rotateZ(6deg);
          }
          35% {
            transform: rotateZ(-4deg);
          }
          40%, 100% {
            transform: rotateZ(0);
          }
        }

        .card-product {
          animation: slideInUp 0.6s ease-out forwards;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .card-product::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
        }

        .card-product:hover::before {
          left: 100%;
        }

        .card-product:hover {
          transform: translateY(-10px) scale(1.03);
        }

        .product-image {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .card-product:hover .product-image {
          transform: scale(1.1) rotate(2deg);
        }

        .loading-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }

        .price-text {
          transition: all 0.3s ease;
        }

        .card-product:hover .price-text {
          font-weight: 700;
          animation: pulse 1s infinite;
        }

        .product-name {
          transition: all 0.3s ease;
          position: relative;
        }

        .card-product:hover .product-name {
          color: #1f2937;
          font-weight: 600;
        }

        .stock-badge {
          animation: bounce 2s infinite;
        }

        .out-of-stock {
          animation: wiggle 0.5s ease-in-out;
        }

        .fade-in-image {
          animation: fadeIn 0.8s ease-out;
          transition: all 0.3s ease;
        }

        .glow-effect {
          animation: glow 2s ease-in-out infinite alternate;
        }

        .unit-text {
          transition: all 0.3s ease;
          opacity: 0.7;
        }

        .card-product:hover .unit-text {
          opacity: 1;
          color: #6b7280;
        }

        .border-animation {
          position: relative;
        }

        .border-animation::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .card-product:hover.border-animation::after {
          opacity: 1;
        }

        .cart-button-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        }
      `}</style>

      <Link
        to={url}
        className="card-product border-animation bg-white border rounded-lg p-4 flex flex-col justify-between min-w-[170px] max-w-[170px] h-[300px] mb-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Loading Animation */}
        <div className="flex items-center justify-center overflow-hidden relative">
          {!imageLoaded && (
            <div className="loading-shimmer absolute inset-0 rounded"></div>
          )}
          <img
            src={data?.image}
            alt={data?.name}
            className={`product-image max-h-full max-w-full object-contain ${
              imageLoaded ? 'fade-in-image' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Hover Overlay Effect */}
          {/* {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded transition-opacity duration-300"></div>
          )} */}
        </div>

        {/* Delivery Time (if needed) */}
        <div className="text-xs text-gray-700 mt-3 flex items-center gap-1">
          {/* Future delivery time content */}
        </div>

        {/* Product Name with Hover Animation */}
        <div className="product-name text-sm font-medium text-black mt-1 line-clamp-2 text-xs leading-tight">
          {data?.name}
        
        </div>

        {/* Unit with Smooth Transition */}
        <div className="unit-text text-xs text-gray-500 mt-1 mb-2">
          {data?.unitQuantity} {data?.unit}
        </div>

        {/* Price + Add to Cart with Enhanced Animations */}
        <div 
          className="flex items-center text-xs justify-between pt-2" 
          style={{ borderTop: '1px solid #e5e7eb', justifyContent: "space-between" }}
        >
          <span 
            className="price-text text-xs" 
            style={{fontSize: "14px", fontWeight: "600"}}
          >
            {DisplayPriceInRupees(data?.price)}
          </span>
          
          {data?.quantity === 0 ? (
            <span className="out-of-stock text-red-500 text-xs font-semibold">
              Out of stock
            </span>
          ) : (
            <div className="cart-button-wrapper">
              <AddToCartButton data={data} />
            </div>
          )}
        </div>

        {/* Stock Indicator Badge */}
        {data?.quantity > 0 && data?.quantity < 5 && (
          <div className="stock-badge absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full mt-4">
            Only {data?.quantity} left!
          </div>
        )}

        {/* New/Featured Badge */}
        {data?.isNew && (
          <div className="glow-effect absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}

        {/* Discount Badge */}
        
      </Link>
    </>
  )
}

export default CardProduct
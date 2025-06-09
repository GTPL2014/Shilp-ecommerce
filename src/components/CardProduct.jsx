import React, { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { valideURLConvert } from "../utils/valideURLConvert";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const productSlug = valideURLConvert(data?.name);
  const url = `/product/${data?._id}`;
  // console.log("data",data)
  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // prevent link click
    e.preventDefault(); // prevent navigation
  };

  return (
    <div
      className="card-product border-animation bg-white border rounded-lg p-4 flex flex-col justify-between min-w-[170px] max-w-[170px] h-[300px] mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={url} className="flex flex-col flex-grow">
        {/* Image Container */}
        <div className="flex items-center justify-center overflow-hidden h-[170px] relative">
          {!imageLoaded && (
            <div className="loading-shimmer absolute inset-0 rounded"></div>
          )}
          <img
            src={imageError ? "/fallback.jpg" : data?.image}
            alt={data?.name}
            className={`product-image max-h-full max-w-full object-contain ${
              imageLoaded ? "fade-in-image" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>

        <div className="product-name text-sm font-medium text-black mt-2 line-clamp-2 text-xs leading-tight">
          {data?.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="unit-text text-xs text-gray-500 mt-1 mb-2">
            {data?.unitQuantity} {data?.unit}
          </div>
          {/* <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
            {data?.rating ?? "No rating"}
          </div> */}
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center rounded-[12px]  bg-[#038D63] text-white text-sm font-semibold"
              style={{ fill: "#fff",paddingLeft:5,paddingRight:5 }}
            >
              <span className="text-white text-[12px] font-medium mr-1">
                {data?.rating ?? "No rating"}
              </span>

              <Star size={12} className="text-white-800 mr-1" />
            </span>
          
          </div>
        </div>

        {data?.quantity > 0 && data?.quantity < 5 && (
          <div className="stock-badge absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full mt-4">
            Only {data?.quantity} left!
          </div>
        )}

        {data?.isNew && (
          <div className="glow-effect absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
      </Link>

      {/* Price & Cart Button */}
      <div
        className="flex items-center text-xs justify-between pt-2"
        style={{
          borderTop: "1px solid #e5e7eb",
          justifyContent: "space-between",
        }}
      >
        <span
          className="price-text text-xs"
          style={{ fontSize: "14px", fontWeight: "600" }}
        >
          {DisplayPriceInRupees(data?.price)}
        </span>

        {data?.quantity === 0 ? (
          <span className="out-of-stock text-red-500 text-xs font-semibold">
            Out of stock
          </span>
        ) : (
          <div className="cart-button-wrapper" onClick={handleAddToCartClick}>
            <AddToCartButton data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;

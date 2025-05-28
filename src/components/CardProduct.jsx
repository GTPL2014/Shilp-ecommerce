import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { valideURLConvert } from '../utils/valideURLConvert'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  const url = `/product/${data?._id}`
  const [loading, setLoading] = useState(false)
  return (
    <Link
      to={url}
      className="bg-white border rounded-lg p-4 flex flex-col justify-between min-w-[170px] max-w-[170px] h-[300px] shadow-sm hover:shadow-md transition-all mb-5"
    >
      {/* Image */}
      <div className="flex items-center justify-center overflow-hidden">
        <img
          src={data?.image}
          alt={data?.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Delivery Time */}
      <div className="text-xs text-gray-700 mt-3 flex items-center gap-1">

        {/* <span className="font-medium">12 MINS</span> */}
      </div>

      {/* Name */}
      <div className="text-sm font-medium text-black mt-1 line-clamp-2 text-xs leading-tight">
        {data?.name}
      </div>

      {/* Unit */}
      <div className="text-xs text-gray-500 mt-1 mb-2">{data?.unitQuantity} {data?.unit}</div>

      {/* Price + Add to Cart */}
      <div className="flex items-center text-xs justify-between pt-2" style={{ borderTop: '1px solid #e5e7eb', justifyContent: "space-between" }}>
        <span className="text-xs" style={{fontSize: "14px",fontWeight: "600"}}>{DisplayPriceInRupees(data?.price)}</span>
        {data?.quantity === 0 ? (
          <span className="text-red-500 text-xs">Out of stock</span>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  )
}

export default CardProduct

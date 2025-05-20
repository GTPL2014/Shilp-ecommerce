import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  let productId = params?.id
  const [data, setData] = useState({})
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()
  console.log("productId_____--", productId)

  console.log("SummaryApi", SummaryApi.getProduct.url)
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const ApiUrl = `${SummaryApi.getProduct.url}/${productId}`
        console.log("ApiUrl", ApiUrl)
        const response = await Axios({
          url: ApiUrl
        })
        console.log("productId called", productId)
        const { data: responseData } = response
        if (responseData) {
          setData(responseData)
        }
      } catch (error) {
        AxiosToastError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProductDetails()
  }, [productId, SummaryApi])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }
  console.log("product data", data)
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[80vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data?.image}
            className='w-full h-full object-scale-down'
          />
        </div>
        <div>
        </div>
        <div className='my-4  hidden lg:grid gap-3 '>
          <h2 className='text-lg font-semibold lg:text-2xl'>Product Details</h2>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data?.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data?.unitQuantity} {data?.unit}</p>
          </div>
          <div>
            <p className='font-semibold'>Country of Origin</p>
            <p className='text-base'>India</p>
          </div>
          <div>
            <p className='font-semibold'>Customer Care Details</p>
            <p className='text-base'>Email: info@paridhansangrah.com</p>
          </div><div>
            <p className='font-semibold'>Disclaimer</p>
            <p className='text-base'>Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information. It is recommended not to solely rely on the information presented.
            </p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        {/* <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p> */}
        <h2 className='text-lg font-semibold lg:text-2xl'>{data?.name}</h2>
        <p className=''>{data?.unitQuantity} {data?.unit}</p>
        <Divider />
        <div>
          <p className=''>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data?.price, data?.discount))}</p>
            </div>
            {
              data?.discount && (
                <p className='line-through'>{DisplayPriceInRupees(data?.price)}</p>
              )
            }
            {
              data?.discount && (
                <p className="font-bold text-green-600 lg:text-2xl">{data?.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
              )
            }

          </div>

        </div>

        {
          data?.quantity === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out of Stock</p>
          )
            : (
              // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
              <div className='my-4'>
                <AddToCartButton data={data} />
              </div>
            )
        }


        <h2 className='font-semibold'>Why shop from Paridhan Sangrah? </h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt='Fast and Reliable Delivery'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Fast & Reliable Delivery</div>
              <p>Get your favorite fashion delivered to your doorstep quickly and safely.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best Prices & Exclusive Offers'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Exclusive Offers</div>
              <p>Shop the latest trends at unbeatable prices with exciting discounts and deals.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide Range of Styles'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Range of Styles</div>
              <p>Explore 5000+ fashion products across clothing, accessories, and more for every occasion.</p>
            </div>
          </div>
        </div>


        {/****only mobile */}
        <div className='my-4 grid gap-3 '>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data?.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data?.unitQuantity} {data?.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section >
  )
}

export default ProductDisplayPage

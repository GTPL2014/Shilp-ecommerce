import React, { useState, useEffect } from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const [productData, setProductData] = useState([])
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const TokenAuth = useSelector(state => state.user.token)
  const setUserDetails = useSelector(state => state.user._id)
  const navigate = useNavigate()
  const handleRedirectProductListpage = (CategoryId, cat) => {
    console.log("CategoryId--__", CategoryId)
    navigate(`category/${CategoryId}`)
  }
  console.log("categoryData", categoryData)

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct
      })
      const { data: responseData } = response
      if (responseData) {
        setProductData(responseData)
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [])


  return (
    <section className='bg-white'>
      <div className='container mx-auto'>
        {/* Banner */}
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"}`}>
          <img
            src={banner}
            className='w-full h-full hidden lg:block object-cover rounded'
            alt='banner'
          />
          <img
            src={bannerMobile}
            className='w-full h-full lg:hidden object-cover rounded'
            alt='banner'
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className='container mx-auto px-4 my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4'>
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <div
              key={index}
              className="w-28 flex-shrink-0 flex flex-col items-center"
            >
              <div className="w-28 h-28 bg-blue-100 rounded-lg animate-pulse"></div>
              <div className="bg-blue-100 h-4 w-20 rounded mt-2 animate-pulse"></div>
            </div>
          ))
        ) : (
          categoryData.map((cat) => (
            <div
              key={cat._id}
              className="w-30 flex-shrink-0 flex flex-col items-center cursor-pointer"
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <div className="w-28 h-28 bg-[#f5f5f5] rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-xs font-medium mt-2 leading-tight">
                {cat.name}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Category-wise Product Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 px-2">
        {productData?.map((c) => (
          <CategoryWiseProductDisplay key={c?._id} data={c} />
        ))}
      </div>

    </section >

  )
}

export default Home

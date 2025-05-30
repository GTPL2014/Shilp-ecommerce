import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.png';
import image2 from '../assets/Best_Prices_Offers.png';
import image3 from '../assets/Wide_Assortment.png';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';
import { motion } from 'framer-motion';

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.id;
  const [data, setData] = useState({});
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const ApiUrl = `${SummaryApi.getProduct.url}/${productId}`;
        const response = await Axios({ url: ApiUrl });
        const { data: responseData } = response;
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <motion.section
      className='container mx-auto p-4 grid lg:grid-cols-2'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div>
        <motion.div
          className='bg-white lg:min-h-[80vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={data?.image} className='w-full h-full object-scale-down' alt='Product' />
        </motion.div>

        <motion.div
          className='my-4 hidden lg:grid gap-3'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
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
          </div>
          <div>
            <p className='font-semibold'>Disclaimer</p>
            <p className='text-base'>Every effort is made to maintain accuracy of all information...</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => (
              <div key={index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            ))
          }
        </motion.div>
      </div>

      <motion.div
        className='p-4 lg:pl-7 text-base lg:text-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className='text-lg font-semibold lg:text-2xl'>{data?.name}</h2>
        <p>{data?.unitQuantity} {data?.unit}</p>
        <Divider />

        <div>
          <p>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {DisplayPriceInRupees(pricewithDiscount(data?.price, data?.discount))}
              </p>
            </div>
            {data?.discount && (
              <>
                <p className='line-through'>{DisplayPriceInRupees(data?.price)}</p>
                <p className="font-bold text-green-600 lg:text-2xl">{data?.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
              </>
            )}
          </div>
        </div>

        {data?.quantity === 0 ? (
          <p className='text-lg text-red-500 my-2'>Out of Stock</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold'>Why shop from Paridhan Sangrah?</h2>
        {[image1, image2, image3].map((img, idx) => (
          <div className='flex items-center gap-4 my-4' key={idx}>
            <img src={img} className='w-20 h-20' alt='Reason' />
            <div className='text-sm'>
              <div className='font-semibold'>
                {idx === 0 && "Fast & Reliable Delivery"}
                {idx === 1 && "Best Prices & Exclusive Offers"}
                {idx === 2 && "Wide Range of Styles"}
              </div>
              <p>
                {idx === 0 && "Get your favorite fashion delivered to your doorstep quickly and safely."}
                {idx === 1 && "Shop the latest trends at unbeatable prices with exciting discounts and deals."}
                {idx === 2 && "Explore 5000+ fashion products across clothing, accessories, and more for every occasion."}
              </p>
            </div>
          </div>
        ))}

        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data?.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data?.unitQuantity} {data?.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => (
              <div key={index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            ))
          }
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ProductDisplayPage;

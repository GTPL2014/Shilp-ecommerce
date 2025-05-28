import React, { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const TokenAuth = useSelector((state) => state.user.token);
  const setUserDetails = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const handleRedirectProductListpage = (CategoryId, cat) => {
    console.log("CategoryId--__", CategoryId);
    navigate(`category/${CategoryId}`);
  };
  console.log("categoryData", categoryData);

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
      });
      const { data: responseData } = response;
      if (responseData) {
        setProductData(responseData);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        {/* Banner */}
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block object-cover rounded"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden object-cover rounded"
            alt="banner"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="container mx-auto px-4 my-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Categories</h2>

          {/* Animated Search Input */}
          <div className="relative animate-fade-in-right">
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
              onChange={(e) => handleCategorySearch(e.target.value)}
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-4 my-4 overflow-x-auto scrollbar-hide p-6">
        <div className="flex gap-4 w-max scrollbar-hide">
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
                <div
                  key={index}
                  className="w-28 flex-shrink-0 flex flex-col items-center"
                >
                  <div className="w-28 h-28 bg-blue-100 rounded-full animate-pulse"></div>
                  <div className="bg-blue-100 h-4 w-20 rounded mt-2 animate-pulse"></div>
                </div>
              ))
            : categoryData.map((cat, index) => (
                <div
                  key={cat._id}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                  }}
                  className="w-28 flex-shrink-0 flex flex-col items-center cursor-pointer group transition-all  duration-300 ease-out hover:scale-105 hover:-translate-y-2"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="w-28 h-28 bg-[#f5f5f5] rounded-full flex items-center justify-center overflow-hidden relative transition-all duration-300 ease-out group-hover:shadow-xl group-hover:shadow-blue-200/50 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 group-hover:border-2 group-hover:border-blue-200">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out animate-pulse"></div>

                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-120 group-hover:brightness-140 relative z-10"
                    />

                    {/* Hover overlay with subtle gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20"></div>
                  </div>

                  <p className="text-center text-xs font-medium mt-2 leading-tight transition-all duration-300 ease-out group-hover:text-blue-600 group-hover:font-semibold group-hover:scale-105 group-hover:drop-shadow-sm">
                    {cat.name}
                  </p>

                  {/* Animated underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ease-out group-hover:w-16 mt-1"></div>
                </div>
              ))}
        </div>
      </div>

      {/* Category-wise Product Display */}
      <div className="container mx-auto px-4 my-4">
        <h2 className="text-lg font-semibold mb-4 animate-fade-in-down">
          Products
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
        {productData?.map((c, index) => (
          <div
            key={c?._id}
            className="animate-fade-in-up opacity-0"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div className="group cursor-pointer h-full">
              <div className="relative overflow-hidden rounded-2xl hover:shadow-gray-200/50 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-gray-200 ">
                <div className="relative transition-transform duration-300 group-hover:scale-[1.02]">
                  <CategoryWiseProductDisplay data={c} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth hover states */
        .group:hover {
          transform: translateY(-8px);
        }

        /* Professional focus states for accessibility */
        .group:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default Home;

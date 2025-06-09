import React, { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";
import seprator from "../assets/seprator.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import Footer from "./Footer";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import googleplayimage from "../assets/img-google-play.png";
import appstoreimage from "../assets/img-app-store.png";
import logo from "../assets/main-logo.png";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const TokenAuth = useSelector((state) => state.user.token);
  const setUserDetails = useSelector((state) => state.user._id);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(
    categoryData || []
  );
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const handleRedirectProductListpage = (CategoryId, cat) => {
    console.log("CategoryId--__", CategoryId);
    navigate(`category/${CategoryId}`);
  };
  useEffect(() => {
    setFilteredCategories(categoryData);
  }, [categoryData]);

  const handleCategorySearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSuggestions([]);
      setFilteredCategories(categoryData);
      return;
    }
    const keyword = term.toLowerCase();
    const filtered = categoryData.filter((cat) =>
      cat.name.toLowerCase().includes(keyword)
    );
    setFilteredCategories(filtered);
    const suggest = filtered.slice(0, 5); // limit suggestions to top 5 from filtered
    setSuggestions(suggest);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    handleCategorySearch(name);
    setSuggestions([]); // clear suggestions
  };

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
      <div className="">
        {/* Banner */}
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            className="w-full h-full lg:block object-cover rounded"
            alt="banner"
          />
          {/* <img
            src={bannerMobile}
            className="w-full h-full lg:hidden object-cover rounded"
            alt="banner"
          /> */}
        </div>
      </div>
      <div className="bg-white rounded-xl px-6 py-4 mx-4 my-6 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 ease-in-out group">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-800">
          {/* 1st Feature */}
          <div className="flex items-center gap-2 group-hover:scale-105 group-hover:text-pink-500 transition-all duration-300">
            <span className="text-pink-500 text-lg group-hover:scale-110 transition-transform">
              📦
            </span>
            <span>7 Days Easy Return</span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-pink-100"></div>

          {/* 2nd Feature */}
          <div className="flex items-center gap-2 group-hover:scale-105 group-hover:text-pink-500 transition-all duration-300">
            <span className="text-pink-500 text-lg group-hover:scale-110 transition-transform">
              💰
            </span>
            <span>Cash on Delivery</span>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-pink-100"></div>

          {/* 3rd Feature */}
          <div className="flex items-center gap-2 group-hover:scale-105 group-hover:text-pink-500 transition-all duration-300">
            <span className="text-pink-500 text-lg group-hover:scale-110 transition-transform">
              🛍️
            </span>
            <span>Lowest Prices</span>
          </div>
        </div>
      </div>
      {/* Category Grid */}
      <div className="auto px-4 my-4">
        {/* Hoverable Row */}
        <div className="flex items-center z-[9999] justify-between bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow duration-500 ease-in-out">
          {/* Animated Heading */}
          <h2 className="text-lg font-semibold text-gray-800 transition-all duration-500 ease-in-out hover:text-pink-600 group-hover:text-xl">
            Categories
          </h2>

          {/* Input container */}
          <div className="relative">
            <div className="w-[260px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleCategorySearch(e.target.value)}
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition duration-300"
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

            {/* Suggestion Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-[9999] bg-white border border-pink-100 rounded-md mt-2 w-full shadow-xl max-h-60 overflow-y-auto">
                {suggestions.map((sug, i) => (
                  <li
                    key={sug._id || i}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 cursor-pointer transition"
                    onClick={() => handleSuggestionClick(sug.name)}
                  >
                    {sug.name}
                  </li>
                ))}
              </ul>
            )}
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
            : filteredCategories?.map((cat, index) => (
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
                      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-120 group-hover:brightness-140 relative"
                    />

                    {/* Hover overlay with subtle gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
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
      <div className=" relative">
        {/* Banner */}
        <div
          style={{ height: "320px" }}
          className={`w-full min-h-38 bg-blue-100 rounded overflow-hidden ${
            !seprator && "animate-pulse my-2"
          }`}
        >
          <img
            src={seprator}
            className="w-full h-full lg:block object-cover rounded"
            alt="separator"
          />

          {/* Shop Now Button */}
          <div className="absolute bottom-6 left-6">
            <button
              onClick={() => {
                navigate("/search");
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold text-lg rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <TypeAnimation
                sequence={[
                  "Shop Now",
                  1500,
                  "Grab Deals",
                  1500,
                  "Explore More",
                  1000,
                  "Discover Deals",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Category-wise Product Display */}
      <div className=" px-4 my-4">
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
      <section className="p-6 pt-2 my-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="position-relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
                  borderRadius: "16px",
                  padding: "25px 20px",
                  boxShadow: "0 8px 20px rgba(251, 191, 36, 0.1)",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                }}
              >
                {/* Background decorative elements */}
                <div
                  className="position-absolute"
                  style={{
                    top: "-20px",
                    right: "-20px",
                    width: "60px",
                    height: "40px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    filter: "blur(20px)",
                  }}
                />

                <div  style={{ cursor: 'pointer' }}  onClick={() => window.open("https://play.google.com/store/apps/details?id=com.swabhiman&hl=en", "_blank")} className="row align-items-center">
                  {/* Left Content */}
                  <div className="col-lg-8 col-md-7 mb-2 mb-md-0">
                    <div className="d-flex align-items-center">
                      {/* Badge */}
                      <span
                        className="badge px-2 py-1 me-3 mb-4"
                        style={{
                          background: "rgba(255, 255, 255, 0.9)",
                          color: "#d97706",
                          fontSize: "18px",
                          fontWeight: "600",
                          borderRadius: "12px",
                        }}
                      >
                        📱 App
                      </span>

                      {/* Main Content */}
                      <div className="flex-grow-1">
                        <h5
                          className="mb-1"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#1f2937",
                            marginTop:20
                          }}
                        >
                          Download{" "}
                          <span style={{ color: "#d97706" }}>
                            Paridhan Sangrah
                          </span>{" "}
                          App
                        </h5>
                        <p
                          className="mb-0"
                          style={{
                            fontSize: "0.85rem",
                            color: "#4b5563",
                             marginTop:10
                          }}
                        >
                          Online Orders made easy, fast and reliable
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4" style={{ marginTop:30}}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      className="h-12 w-auto"
                    />
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                      className="h-12 w-auto"
                    />
                  </div>
                </div>
                {/* <div>
                   <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="App Store"
                      className="h-12 w-auto"
                    />
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-5px);
            }
          }
        `}</style>
      </section>
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
          outline-offset: 2px;
        }
      `}</style>
      <Footer />
    </section>
  );
};

export default Home;

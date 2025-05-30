import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";
import NoData from "../components/NoData";
const ProductListPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState(AllSubCategory);
  const subCategoryId = params.subCategoryId;

  useEffect(() => {
    const fetchSubCategoryDetails = async () => {
      try {
        setHasError(false);
        setData("");
        setLoading(true);
        const ApiUrl = `${SummaryApi.getProductByCategoryAndSubCategory.url}/${subCategoryId}`;
        const response = await Axios({
          url: ApiUrl,
        });
        const { data: responseData } = response;
        if (responseData) {
          setData(responseData);
        }
      } catch (error) {
        setHasError(true);
        AxiosToastError(error);
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategoryDetails();
  }, [subCategoryId]);

  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .category-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .category-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .category-item:hover::before {
          left: 100%;
        }

        .category-item:hover {
          transform: translateX(8px);
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          border-left: 4px solid #22c55e;
        }

        .category-item.active {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          border-left: 4px solid #22c55e;
          transform: translateX(8px);
        }

        .product-grid {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.3s forwards;
        }

        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: #22c55e #f1f5f9;
        }

        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #16a34a, #15803d);
        }

        .loading-shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(
            45deg,
            #22c55e,
            #3b82f6,
            #8b5cf6,
            #ef4444
          );
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
          border-radius: 8px;
          padding: 2px;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .card-product-wrapper {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card-product-wrapper:hover {
          transform: translateY(-10px) scale(1.02);
          filter: brightness(1.05);
        }
      `}</style>

      <section className="sticky top-24 lg:top-20 animate-fadeIn">
        <div className="container sticky top-24 mx-auto grid grid-cols-[50px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
          {/* Sidebar Categories with Enhanced Animations */}
          <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbar-custom bg-white py-2 animate-slideInLeft">
            {DisplaySubCatory.map((s, index) => {
              return (
                <Link
                  key={s._id}
                  onClick={() => navigate(`/subcategory/${s._id}`)}
                  className={`
                    category-item w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                    cursor-pointer opacity-0
                    ${subCategoryId === s._id ? "active" : ""}
                  `}
                  style={{
                    animation: `slideInLeft 0.6s ease-out ${
                      index * 0.1
                    }s forwards`,
                  }}
                >
                  <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border hover-lift">
                    <img
                      src={s.image}
                      alt="subCategory"
                      className="w-14 lg:h-14 lg:w-12 h-full object-scale-down transition-all duration-300 hover:scale-110 hover:rotate-3"
                      loading="lazy"
                    />
                  </div>
                  <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base font-medium transition-all duration-300 hover:font-semibold hover:text-green-600">
                    {s.name}
                  </p>
                </Link>
              );
            })}
          </div>
          {hasError && (
            <NoData message="Something went wrong, please try again later." />
          )}
          {/* Products Section with Enhanced Animations */}
          <div className="sticky top-20 animate-slideInRight">
            {/* Header with Animated Progress Bar */}
            

            <div>
              <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
                {loading ? (
                  // Enhanced Loading Animation
                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 p-4 gap-4">
                    {[...Array(10)].map((_, index) => (
                      <div
                        key={index}
                        className="loading-shimmer rounded-lg h-64 animate-scaleIn hover-lift"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  // Enhanced Product Grid
                  <div
                    className="product-grid grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 p-4 gap-2"
                    style={{ display: "flex", marginRight: 17 }}
                  >
                    {data?.data?.map((p, index) => {
                      return (
                        <div
                          key={p._id + "productSubCategory" + index}
                          className="card-product-wrapper opacity-0"
                          style={{
                            animation: `slideInUp 0.6s ease-out ${
                              index * 0.1
                            }s forwards`,
                          }}
                        >
                          <CardProduct data={p} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Enhanced Loading Overlay */}
              {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm">
                  <div className="animate-scaleIn">
                    <div className="relative">
                      <Loading />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="animate-bounce text-white font-semibold">
                          Loading...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListPage;

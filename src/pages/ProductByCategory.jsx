import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useNavigate, useParams } from "react-router-dom";
import { setAllSubCategory } from "../store/productSlice";
import { useDispatch } from "react-redux";

const SubCategoryPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const categoryId = params?.CategoryId;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchSubCategoryDetails = async () => {
      try {
        setLoading(true);
        const ApiUrl = `${SummaryApi.getSubCategory.url}/${categoryId}`;
        const response = await Axios({ url: ApiUrl });
        const { data: responseData } = response;
        if (responseData) {
          dispatch(
            setAllSubCategory(
              responseData.sort((a, b) => a.name.localeCompare(b.name))
            )
          );
          setData(responseData);
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoryDetails();
  }, [categoryId]);

  return (
    <section className="p-4 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Animated Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in-down">
          Sub Categories
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-expand-width"></div>
      </div>

      {/* Loading State with Beautiful Animation */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            {/* Spinning circles */}
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg font-medium animate-pulse">Loading amazing subcategories...</p>
        </div>
      )}

      {/* Grid with Staggered Animation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {data.map((sub, idx) => (
          <div
            key={sub._id}
            className="animate-fade-in-up opacity-0 transform translate-y-8"
            style={{
              animationDelay: `${idx * 100}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <div
              onClick={() => navigate(`/subCategory/${sub._id}`)}
              className="group cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 ease-out hover:-translate-y-3 transform-gpu h-full border border-gray-100 hover:border-blue-200">
                <div className="relative overflow-hidden rounded-t-2xl">                  
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-48 object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105"
                  />
               </div>
                <div className="p-4 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="text-sm font-semibold text-gray-800 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105 group-hover:font-bold relative z-10">
                    {sub.name}
                  </h3>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 rounded-full transition-all duration-400 group-hover:w-12"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes expand-width {
          0% {
            width: 0;
          }
          100% {
            width: 6rem;
          }
        }
        
        @keyframes spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-expand-width {
          animation: expand-width 1s ease-out 0.5s forwards;
          width: 0;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
        
        /* Smooth focus states */
        .group:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </section>
  );
};

export default SubCategoryPage;
import React, { useEffect, useRef, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const searchTextParam = decodeURIComponent(location.search?.slice(3) || "");

  const [searchText, setSearchText] = useState(searchTextParam);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  // Detect click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide suggestions on Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        setSuggestions([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isSearchPage || !searchText.trim()) {
      setSuggestions([]);
      return;
    }
    const delay = setTimeout(() => {
      fetchSuggestions(searchText);
    }, 200);
    return () => clearTimeout(delay);
  }, [searchText, isSearchPage]);

  const fetchSuggestions = async (keyword) => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchSuggestion,
        data: { keyword },
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        setSuggestions(responseData.suggestions || []);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (keyword) => {
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setSearchText(keyword);
    setSuggestions([]);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div ref={wrapperRef} className="relative w-full min-w-[300px] lg:min-w-[420px]">
      <div className="h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
        <div>
          {isMobile && isSearchPage ? (
            <Link
              to="/"
              className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
            >
              <FaArrowLeft size={20} />
            </Link>
          ) : (
            <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
              <IoSearch size={22} />
            </button>
          )}
        </div>

        <div className="w-full h-full">
          {!isSearchPage ? (
            <div
              onClick={redirectToSearchPage}
              className="w-full h-full flex items-center cursor-text"
            >
              <TypeAnimation
                sequence={[
                  'Search "Dupattas & Stoles"',
                  1000,
                  'Search "Wooden Furniture"',
                  1000,
                  'Search "Terracotta Decor"',
                  1000,
                  'Search "Decorative Wall Panels"',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            <input
              type="text"
              placeholder="Search for Women, Men, Kids & More..."
              autoFocus
              className="bg-transparent w-full h-full outline-none px-2"
              value={searchText}
              onChange={handleOnChange}
            />
          )}
        </div>
      </div>

      {/* Suggestion Dropdown */}
      {isSearchPage && suggestions.length > 0 && (
        <ul className="absolute z-[9999] bg-white border border-pink-100 rounded-md mt-1 w-full shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((sug, i) => (
            <li
              key={sug._id || i}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 cursor-pointer transition"
              onClick={() => handleSuggestionClick(sug.name || sug)}
            >
              {sug.name || sug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

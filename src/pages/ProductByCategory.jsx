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
  // console.log("Hello")
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
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sub Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.map((sub, idx) => (
          <div
            key={sub._id}
            onClick={() => navigate(`/subCategory/${sub._id}`)}
            className="p-4 border rounded shadow hover:shadow-md transition duration-300 bg-white text-center"
          >
            <img
              src={sub.image}
              alt={sub.name}
              className="w-30 h-48 object-cover mx-auto mb-2 rounded"
            />
            <h3 className="text-sm font-medium">{sub.name}</h3>
          </div>
        ))}
      </div>
      {loading && <h2 className="text-center mt-4 ">Loading...</h2>}
    </section>
  );
};

export default SubCategoryPage;

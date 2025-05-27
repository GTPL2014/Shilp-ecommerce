import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";
const userId = localStorage.getItem("userId");
const fetchUserDetails = async () => {
  try {
    if (!userId) {
      return null; // or handle the case where userId is not available
    }
    const response = await Axios({
      url: `${SummaryApi.userDetails.url}/${userId}`,
    });
    console.log("response in fetch user", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;

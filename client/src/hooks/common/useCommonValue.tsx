// useCommonValue.tsx

import { useLocation, useNavigate } from "@imports/ImportReacts";
import { dataArray } from "@imports/ImportUtils";

// -------------------------------------------------------------------------------------------------
export const useCommonValue = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const location_id = location?.state?._id;
  const location_category = location?.state?.category;

  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";
  const thirdStr = PATH?.split("/")[3] || "";

  const TITLE = process.env.REACT_APP_TITLE || "";
  const URL = process.env.REACT_APP_SERVER_URL || "";
  const SUBFIX = process.env[`REACT_APP_${firstStr.toUpperCase()}_URL`] || "";
  const GCLOUD_URL = process.env.REACT_APP_GCLOUD_URL || "";

  const isAdmin = localStorage.getItem(`${TITLE}_admin`) === "true" ? true : false;
  const adminId = localStorage.getItem(`${TITLE}_adminId`);
  const adminPw = localStorage.getItem(`${TITLE}_adminPw`);
  const isUser = localStorage.getItem(`${TITLE}_user`) === "true" ? true : false;
  const userId = localStorage.getItem(`${TITLE}_userId`);
  const userPw = localStorage.getItem(`${TITLE}_userPw`);

  // -----------------------------------------------------------------------------------------------
  return {
    navigate,
    location,
    location_id,
    location_category,
    PATH,
    firstStr,
    secondStr,
    thirdStr,
    TITLE,
    URL,
    SUBFIX,
    GCLOUD_URL,
    isAdmin,
    adminId,
    adminPw,
    isUser,
    userId,
    userPw,
    dataArray,
  };
};
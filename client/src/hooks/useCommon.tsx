// useCommon.tsx

import { useLocation, useNavigate } from "@imports/ImportReacts";
import { moment } from "@imports/ImportLibs";
import { dataArray } from "@imports/ImportUtils";

// -------------------------------------------------------------------------------------------------
export const useCommon = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const location_id = location?.state?.id;
  const location_category = location?.state?.category;

  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";
  const thirdStr = PATH?.split("/")[3] || "";

  const TITLE = process.env.REACT_APP_TITLE || "";
  const URL = process.env.REACT_APP_SERVER_URL || "";
  const SUBFIX = process.env[`REACT_APP_${firstStr.toUpperCase()}_URL`] || "";

  const getSessionAdmin = localStorage.getItem(`${TITLE}_admin`) || "";
  const getSessionAdminId = localStorage.getItem(`${TITLE}_adminId`) || "";
  const getSessionAdminPw = localStorage.getItem(`${TITLE}_adminPw`) || "";
  const getSessionUser = localStorage.getItem(`${TITLE}_user`) || "";
  const getSessionUserId = localStorage.getItem(`${TITLE}_userId`) || "";
  const getSessionUserPw = localStorage.getItem(`${TITLE}_userPw`) || "";
  const isAdmin = getSessionAdmin === "true" ? true : false;
  const adminId = getSessionAdminId;
  const adminPw = getSessionAdminPw;
  const isUser = getSessionUser === "true" ? true : false;
  const userId = getSessionUserId;
  const userPw = getSessionUserPw;

  const newDate = moment().tz("Asia/Seoul");
  const koreanDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
  const curWeekStart = moment().tz("Asia/Seoul").startOf("isoWeek").format("YYYY-MM-DD");
  const curWeekEnd = moment().tz("Asia/Seoul").endOf("isoWeek").format("YYYY-MM-DD");
  const curMonthStart = moment().tz("Asia/Seoul").startOf("month").format("YYYY-MM-DD");
  const curMonthEnd = moment().tz("Asia/Seoul").endOf("month").format("YYYY-MM-DD");
  const curYearStart = moment().tz("Asia/Seoul").startOf("year").format("YYYY-MM-DD");
  const curYearEnd = moment().tz("Asia/Seoul").endOf("year").format("YYYY-MM-DD");

  return {
    navigate, location,
    location_id, location_category, PATH, firstStr, secondStr, thirdStr,
    URL, SUBFIX, TITLE,
    isAdmin, adminId, adminPw, dataArray, isUser, userId, userPw,
    newDate, koreanDate, curWeekStart, curWeekEnd, curMonthStart, curMonthEnd, curYearStart, curYearEnd,
  };
};
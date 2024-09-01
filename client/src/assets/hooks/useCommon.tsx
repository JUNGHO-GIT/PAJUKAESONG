// useCommon.tsx

import { useLocation, useNavigate } from "@imports/ImportReacts";
import { moment } from "@imports/ImportLibs";
import { dataArray } from "@imports/ImportUtils";

// -------------------------------------------------------------------------------------------------
export const useCommon = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const location_id = location?.state?.id;
  const location_dateType = location?.state?.dateType;
  const location_dateStart = location?.state?.dateStart;
  const location_dateEnd = location?.state?.dateEnd;
  const location_category = location?.state?.category;

  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";
  const thirdStr = PATH?.split("/")[3] || "";

  const URL = process.env.REACT_APP_SERVER_URL || "";
  const SUBFIX = process.env[`REACT_APP_${firstStr.toUpperCase()}_URL`] || "";

  const getSessionAdmin = localStorage.getItem("ADMIN") || "";
  const getSessionAdminId = localStorage.getItem("ADMIN_ID") || "";
  const getSessionAdminPw = localStorage.getItem("ADMIN_PW") || "";
  const isAdmin = getSessionAdmin === "true" ? true : false;
  const isAdminId = getSessionAdminId;
  const isAdminPw = getSessionAdminPw;

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
    location_id, location_category, location_dateType, location_dateStart, location_dateEnd,
    PATH, firstStr, secondStr, thirdStr,
    URL, SUBFIX,
    isAdmin, isAdminId, isAdminPw, dataArray,
    newDate, koreanDate, curWeekStart, curWeekEnd, curMonthStart, curMonthEnd, curYearStart, curYearEnd,
  };
};
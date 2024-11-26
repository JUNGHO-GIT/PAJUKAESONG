// useCommonValue.tsx

import { useLocation, useNavigate } from "@importReacts";
import { dataArray } from "@importScripts";

// -------------------------------------------------------------------------------------------------
export const useCommonValue = () => {

  // location
  const navigate: any = useNavigate();
  const location: any = useLocation();
  const location_id: string = location?.state?._id;
  const location_category: string = location?.state?.category;
  const PATH: string = location?.pathname;
  const firstStr: string = PATH?.split("/")[1] || "";
  const secondStr: string = PATH?.split("/")[2] || "";
  const thirdStr: string = PATH?.split("/")[3] || "";

  // env
  const TITLE = process.env.REACT_APP_TITLE || "";
  const URL = process.env.REACT_APP_SERVER_URL || "";
  const SUBFIX = process.env[`REACT_APP_${firstStr.toUpperCase()}_URL`] || "";
  const GCLOUD_URL = process.env.REACT_APP_GCLOUD_URL || "";

  // local storage (object 타입)
  const localTitle: any = JSON.parse(localStorage.getItem(TITLE) || "{}");
  const localSetting: any = localTitle?.setting || {};

  // local storage (string 타입)
  const localTimeZone: string = localTitle?.setting?.locale?.timeZone || "UTC";
  const localZoneName: string = localTitle?.setting?.locale?.zoneName || "UTC";
  const localLang: string = localTitle?.setting?.locale?.lang;
  const localIsoCode: string = localTitle?.setting?.locale?.isoCode || "US";
  const localCurrency: string = localTitle?.setting?.locale?.currency || "USD";
  const localUnit: string = localTitle?.setting?.locale?.unit || "lbs";
  const adminId: string = localTitle?.setting?.id?.adminId;
  const adminPw: string = localTitle?.setting?.id?.adminPw;
  const userId: string = localTitle?.setting?.id?.userId;
  const userPw: string = localTitle?.setting?.id?.userPw;

  // local storage (boolean 타입)
  const isAdmin: boolean = localTitle?.setting?.id?.admin === "true" ? true : false;
  const isUser: boolean = localTitle?.setting?.id?.user === "true" ? true : false;

  // session storage (object 타입)
  const sessionTitle: any = JSON.parse(sessionStorage.getItem(TITLE) || "{}");
  const sessionSetting: any = sessionTitle?.setting || {};

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
    localTitle,
    localSetting,
    localTimeZone,
    localZoneName,
    localLang,
    localIsoCode,
    localCurrency,
    localUnit,
    adminId,
    adminPw,
    userId,
    userPw,
    isAdmin,
    isUser,
    sessionTitle,
    sessionSetting,
    dataArray
  };
};
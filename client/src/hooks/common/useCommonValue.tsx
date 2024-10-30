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

  // local storage (boolean 타입)
  const isAdmin: boolean = localTitle?.setting?.id?.admin === "true" ? true : false;
  const isUser: boolean = localTitle?.setting?.id?.user === "true" ? true : false;

  // local storage (string 타입)
  const adminId: string = localTitle?.setting?.id?.adminId;
  const adminPw: string = localTitle?.setting?.id?.adminPw;
  const userId: string = localTitle?.setting?.id?.userId;
  const userPw: string = localTitle?.setting?.id?.userPw;
  const localTimeZone: string = localTitle?.setting?.locale?.timeZone;
  const localZoneName: string = localTitle?.setting?.locale?.zoneName;
  const localLang: string = localTitle?.setting?.locale?.lang;
  const localIsoCode: string = localTitle?.setting?.locale?.isoCode;
  const localCurrency: string = localTitle?.setting?.locale?.currency;

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
    localTitle,
    localTimeZone,
    localZoneName,
    localLang,
    localIsoCode,
    localCurrency,
  };
};
// useResponsive.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue } from "@importHooks";
import { useMediaQuery } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const useResponsive = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommonValue();
  const isXxs = useMediaQuery("(min-width: 0px) and (max-width: 330px)");
  const isXs = useMediaQuery("(min-width: 330px) and (max-width: 630px)");
  const isSm = useMediaQuery("(min-width: 630px) and (max-width: 930px)");
  const isMd = useMediaQuery("(min-width: 930px) and (max-width: 1200px)");
  const isLg = useMediaQuery("(min-width: 1200px) and (max-width: 1500px)");
  const isXl = useMediaQuery("(min-width: 1500px) and (max-width: 1800px)");
  const isXxl = useMediaQuery("(min-width: 1800px)");

  // 2. useState -----------------------------------------------------------------------------------
  const [paperClass, setPaperClass] = useState("");

  // 3. useEffect ----------------------------------------------------------------------------------
  useEffect(() => {
    let baseClass = "content-wrapper fadeIn h-min50vh";
    baseClass += PATH.includes("list") ? " px-10 py-20" : " px-20 py-20";

    if (isXxs || isXs) {
      baseClass += " w-100p";
    } else if (isSm) {
      baseClass += " w-90p";
    } else if (isMd) {
      baseClass += " w-70p";
    } else if (isLg) {
      baseClass += " w-60p";
    } else if (isXl) {
      baseClass += " w-50p";
    } else if (isXxl) {
      baseClass += " w-40p";
    }

    setPaperClass(baseClass);
  }, [PATH, isXxs, isXs, isSm, isMd, isLg, isXl, isXxl]);

  // -----------------------------------------------------------------------------------------------
  return {
    isXxs,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    paperClass
  };
};

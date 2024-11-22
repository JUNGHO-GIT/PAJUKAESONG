// useResponsive.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue } from "@importHooks";
import { useMediaQuery } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const useResponsive = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommonValue();

  // 2. useState -----------------------------------------------------------------------------------
  const [paperClass, setPaperClass] = useState("");

  // 2. useMediaQuery ------------------------------------------------------------------------------
  const xxs = useMediaQuery("(min-width: 0px) and (max-width: 330px)");
  const xs = useMediaQuery("(min-width: 330px) and (max-width: 630px)");
  const sm = useMediaQuery("(min-width: 630px) and (max-width: 930px)");
  const md = useMediaQuery("(min-width: 930px) and (max-width: 1200px)");
  const lg = useMediaQuery("(min-width: 1200px) and (max-width: 1500px)");
  const xl = useMediaQuery("(min-width: 1500px) and (max-width: 1800px)");
  const isXxl = useMediaQuery("(min-width: 1800px)");

  // 3. useEffect ----------------------------------------------------------------------------------
  useEffect(() => {
    let baseClass = "content-wrapper fadeIn h-min50vh";
    baseClass += PATH.includes("list") ? " px-10 py-30" : " px-20 py-30";

    if (xxs || xs) {
      baseClass += " w-100p";
    } else if (sm) {
      baseClass += " w-90p";
    } else if (md) {
      baseClass += " w-70p";
    } else if (lg) {
      baseClass += " w-60p";
    } else if (xl) {
      baseClass += " w-50p";
    } else if (isXxl) {
      baseClass += " w-40p";
    }

    setPaperClass(baseClass);
  }, [PATH, xxs, xs, sm, md, lg, xl, isXxl]);

  // -----------------------------------------------------------------------------------------------
  return {
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    isXxl,
    paperClass
  };
};

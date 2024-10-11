// useResponsive.tsx

import { useMediaQuery } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const useResponsive = () => {

  // 2-1. useState ---------------------------------------------------------------------------------
  const isXxs = useMediaQuery("(min-width: 0px) and (max-width: 330px)");
  const isXs = useMediaQuery("(min-width: 330px) and (max-width: 630px)");
  const isSm = useMediaQuery("(min-width: 630px) and (max-width: 930px)");
  const isMd = useMediaQuery("(min-width: 930px) and (max-width: 1200px)");
  const isLg = useMediaQuery("(min-width: 1200px) and (max-width: 1500px)");
  const isXl = useMediaQuery("(min-width: 1500px)");

  // -----------------------------------------------------------------------------------------------
  return {
    isXxs,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl
  };
};

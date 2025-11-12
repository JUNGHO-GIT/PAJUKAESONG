// useScrollTop.tsx

import { useEffect, memo } from "@exportReacts";
import { useCommonValue } from "@exportHooks";

// -------------------------------------------------------------------------------------------------
export const useScrollTop = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommonValue();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [PATH]);

};
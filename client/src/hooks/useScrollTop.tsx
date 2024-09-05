// useScrollTop.tsx

import { useEffect } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useScrollTop = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    PATH
  } = useCommon();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [PATH]);

};
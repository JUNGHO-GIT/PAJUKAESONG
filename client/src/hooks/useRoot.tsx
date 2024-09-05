// useRoot.tsx

import { useEffect } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useRoot = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {navigate, location} = useCommon();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {

    // '/'경로로 진입했을때의 처리
    if (location.pathname === '/') {
      navigate("/main");
    }
  }, [location, navigate]);
};
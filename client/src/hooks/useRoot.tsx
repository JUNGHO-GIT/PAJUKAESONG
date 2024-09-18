// useRoot.tsx

import { useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useRoot = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {navigate, location} = useCommonValue();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {

    // '/'경로로 진입했을때의 처리
    if (location.pathname === '/') {
      navigate("/main");
    }
  }, [location, navigate]);
};
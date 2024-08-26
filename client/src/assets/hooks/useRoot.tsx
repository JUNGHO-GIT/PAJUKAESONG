// useRoot.tsx

import { useEffect } from "../../import/ImportReacts.tsx";
import { useCommon } from "../../import/ImportHooks.tsx";

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
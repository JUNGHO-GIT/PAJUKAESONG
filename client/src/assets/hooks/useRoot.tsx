// useRoot.tsx

import { useEffect, useNavigate, useLocation } from "../../import/ImportReacts.tsx";

// -------------------------------------------------------------------------------------------------
export const useRoot = () => {

  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {

    // 1. 리다리렉트 처리
    if (location.pathname === '/') {
      navigate("/main");
    }
  }, [location, navigate]);
};
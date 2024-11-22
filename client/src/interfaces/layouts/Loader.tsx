// Loader.tsx

import { useEffect } from "@importReacts";
import { useStoreLoading } from "@importHooks";
import { Div } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Loader = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { LOADING, setLOADING } = useStoreLoading();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => {
      setLOADING(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [setLOADING]);

  // 7.loader --------------------------------------------------------------------------------------
  const loaderNode = () => (
    (LOADING ? (
      <Div className="loader-wrapper">
        <Div className="loader" />
      </Div>
    ) : (
      null
    ))
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loaderNode()}
    </>
  );
};
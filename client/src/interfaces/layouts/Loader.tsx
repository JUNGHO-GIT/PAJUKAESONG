// Loader.tsx

import { useCommonValue } from "@importHooks";
import { Div } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Loader = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommonValue();

  // 7.loader --------------------------------------------------------------------------------------
  const loaderNode = () => {

    const initLoader = () => (
      <Div className={"h-min100vh d-col-center"}>
        <Div className={"loader"} />
      </Div>
    );

    const listLoader = () => (
      <Div className={"h-min80vh d-col-center"}>
        <Div className={"loader"} />
      </Div>
    );

    return (
      PATH === "/main" ? initLoader() : listLoader()
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loaderNode()}
    </>
  );
};
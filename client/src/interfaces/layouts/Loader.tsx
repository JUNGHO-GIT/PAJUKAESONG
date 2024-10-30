// Loader.tsx

import { useCommonValue } from "@importHooks";
import { Div } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Loader = () => {

  // 7.loader --------------------------------------------------------------------------------------
  const loaderNode = () => {

    const listLoader = () => (
      <Div className={"h-min80vh d-col-center"}>
        <Div className={"loader"} />
      </Div>
    );

    return (
      listLoader()
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loaderNode()}
    </>
  );
};
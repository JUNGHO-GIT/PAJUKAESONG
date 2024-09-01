// Loading.tsx

import { useCommon } from "@imports/ImportHooks";
import { Div } from "@imports/ImportComponents";

// 14. loading -------------------------------------------------------------------------------------
export const Loading = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    PATH
  } = useCommon();

  // 7.loading -------------------------------------------------------------------------------------
  const loadingNode = () => {
    const wrapperSection = () => (
      <Div className={"loader-wrapper d-center"}>
        <Div className={"loader"} />
      </Div>
    );
    return (
      wrapperSection()
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loadingNode()}
    </>
  );
};
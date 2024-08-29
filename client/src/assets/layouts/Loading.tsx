// Loading.tsx

import { useCommon } from "../../imports/ImportHooks.tsx";
import { Div } from "../../imports/ImportComponents.tsx";

// 14. loading -------------------------------------------------------------------------------------
export const Loading = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommon();

  // 7.loading -------------------------------------------------------------------------------------
  const isWrapperNode = () => (
    <Div className={"loader-wrapper d-center"}>
      <Div className={"loader"} />
    </Div>
  );

  const nonWrapperNode = () => (
    <Div className={`h-min60vh d-center`}>
      <Div className={"loader"} />
    </Div>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    PATH.includes("/user/signup") || PATH.includes("/user/login") ? (
      isWrapperNode()
    ) : (
      nonWrapperNode()
    )
  );
};
// Loading.tsx

import { Div } from "@imports/ImportComponents";

// 14. loading -------------------------------------------------------------------------------------
export const Loading = () => {

  // 7.loading -------------------------------------------------------------------------------------
  const loadingNode = () => {
    const wrapperSection = () => (
      <Div className={"d-center"}>
        <Div className={"loader"} />
      </Div>
    );
    const nonWrapperSection = () => (
      <Div className={`h-min70vh d-center`}>
        <Div className={"loader"} />
      </Div>
    );
    return (
      nonWrapperSection()
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loadingNode()}
    </>
  );
};
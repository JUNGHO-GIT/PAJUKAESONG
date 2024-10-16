// Loading.tsx

import { Div } from "@imports/ImportComponents";

// 14. loading -------------------------------------------------------------------------------------
export const Loading = () => {

  // 7.loading -------------------------------------------------------------------------------------
  const loadingNode = () => (
    <Div className={`h-min70vh d-center`}>
      <Div className={"loader"} />
    </Div>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loadingNode()}
    </>
  );
};
// Empty.tsx

import { Div } from "@imports/ImportComponents";
import { Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Empty = () => {

  // 7. empty --------------------------------------------------------------------------------------
  const emptyNode = () => (
    <Card className={"h-min70vh d-center fadeIn"}>
      <Div
        key={"empty"}
        className={"fs-1-6rem d-center"}
      >
        데이터가 없습니다.
      </Div>
    </Card>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {emptyNode()}
    </>
  );
};

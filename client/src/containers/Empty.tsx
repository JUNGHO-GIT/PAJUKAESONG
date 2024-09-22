// Empty.tsx

import { Div } from "@imports/ImportComponents";
import { Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Empty = () => {

  // 7. empty --------------------------------------------------------------------------------------
  const emptyNode = () => {
    const emptySection = () => (
      <Card className={"h-min50vh d-center fadeIn"}>
        <Div
          key={"empty"}
          className={"fs-1-6rem d-center"}
        >
          데이터가 없습니다.
        </Div>
      </Card>
    );
    return (
      emptySection()
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {emptyNode()}
    </>
  );
};

// Empty.tsx

import { Div } from "@imports/ImportComponents";
import { Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
declare type EmptyProps = {
  h?: string;
};

// -------------------------------------------------------------------------------------------------
export const Empty = ({ h }: EmptyProps) => {

  // 7. empty --------------------------------------------------------------------------------------
  const emptyNode = () => (
    <Card className={`h-${h} d-center fadeIn`}>
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

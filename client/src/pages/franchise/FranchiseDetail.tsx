// FranchiseDetail.tsx

import { Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------

  // 7. detailNode -------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        가맹점 정보
      </Div>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {detailNode()}
    </>
  );
};
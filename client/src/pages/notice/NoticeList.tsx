// NoticeList.tsx

import { Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        공지사항
      </Div>
    );
    // 3. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid size={12} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};
// ContactLookup.tsx

import { useState } from "@imports/ImportReacts";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactLookup = () => {

  // 1. common -------------------------------------------------------------------------------------

  // 7. lookupNode ---------------------------------------------------------------------------------
  const lookupNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        문의 조회
      </Div>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid
            size={{ xs:12 }}
            className={"d-center"}
          >
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
      {lookupNode()}
    </>
  );
};
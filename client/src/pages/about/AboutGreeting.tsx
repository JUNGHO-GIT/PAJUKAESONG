// AboutGreeting.tsx

import { Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutGreeting = () => {

  // 1. common -------------------------------------------------------------------------------------

  // 7. greetingNode -------------------------------------------------------------------------------
  const greetingNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        대표 인사말
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
      {greetingNode()}
    </>
  );
};
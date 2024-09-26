// AboutLocation.tsx

import { Div } from "@imports/ImportComponents";
import { Location } from "@imports/ImportContainers";
import { Paper, Grid, Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 1. title
    const titleSection = () => (
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        오시는길
      </Div>
    );
    // 2. location
    const locationSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius fadeIn p-0"} key={i}>
        <Location
          width={"100%"}
          height={"60vh"}
        />
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {locationSection(0)}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {locationNode()}
    </>
  );
};

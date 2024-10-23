// AboutLocation.tsx

import { Location } from "@imports/ImportContainers";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 2. location
    const locationSection = () => (
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={"d-center"}>
          <Location
            width={"100%"}
            height={"60vh"}
            className={"border-2 shadow-1 radius-1"}
          />
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {locationSection()}
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

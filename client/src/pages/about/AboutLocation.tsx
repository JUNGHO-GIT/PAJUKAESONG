// AboutLocation.tsx

import { Location } from "@imports/ImportContainers";
import { Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 2. location
    const locationSection = () => (
      <Location
        width={"100%"}
        height={"60vh"}
        className={"border-2 shadow-2 radius-1"}
      />
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn p-20"}>
        {locationSection()}
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

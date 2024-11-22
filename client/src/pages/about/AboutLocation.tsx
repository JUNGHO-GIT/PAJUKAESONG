// AboutLocation.tsx

import { useResponsive } from "@importHooks";
import { Location } from "@importContainers";
import { Paper } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { paperClass } = useResponsive();

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 2. location
    const locationSection = () => (
      <Location
        width={"100%"}
        height={"60vh"}
        className={"border-1 shadow-2 radius-2"}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass}`}>
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

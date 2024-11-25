// AboutLocation.tsx

import { useEffect } from "@importReacts";
import { useResponsive, useStoreLoading } from "@importHooks";
import { Location } from "@importContainers";
import { Paper } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { paperClass } = useResponsive();
  const { setLOADING } = useStoreLoading();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
  }, []);

  // 7. locationNode -------------------------------------------------------------------------------
  const locationNode = () => {
    // 2. location
    const locationSection = () => (
      <Location
        width={"100%"}
        height={"60vh"}
        className={"border-2 shadow-1 radius-2"}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
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

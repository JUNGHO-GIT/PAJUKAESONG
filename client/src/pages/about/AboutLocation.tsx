// AboutLocation.tsx

import { useEffect, memo } from "@exportReacts";
import { useResponsive } from "@exportHooks";
import { useStoreLoading } from "@exportStores";
import { Location } from "@exportContainers";
import { Paper } from "@exportComponents";

// -------------------------------------------------------------------------------------------------
export const AboutLocation = memo(() => {

  // 1. common -------------------------------------------------------------------------------------
  const { paperClass } = useResponsive();
  const { setLOADING } = useStoreLoading();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
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
});

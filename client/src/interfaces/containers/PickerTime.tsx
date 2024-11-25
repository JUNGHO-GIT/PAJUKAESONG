// Time.tsx

import { moment } from "@importLibs";
import { PopUp, Input } from "@importContainers";
import { Grid } from "@importComponents";
import { DigitalClock, AdapterMoment, LocalizationProvider } from "@importMuis";

// -------------------------------------------------------------------------------------------------
declare type PickerTimeProps = {
  OBJECT: any;
  setOBJECT: any;
  REFS: any;
  ERRORS: any;
  extra: string;
  i: number;
}

// -------------------------------------------------------------------------------------------------
export const PickerTime = (
  { OBJECT, setOBJECT, REFS, ERRORS, extra, i }: PickerTimeProps
) => {

  // 7. time ---------------------------------------------------------------------------------------
  const timeNode = () => {
    const timeSection = () => (
      <PopUp
        type={"innerCenter"}
        position={"center"}
        direction={"center"}
        contents={({closePopup}: any) => (
          <Grid container={true} spacing={2} className={"w-max-40vw h-max-40vh"}>
            <Grid size={12} className={"d-center"}>
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"ko"}>
                <DigitalClock
                  ampm={false}
                  autoFocus={true}
                  timeStep={20}
                  timezone={"Asia/Seoul"}
                  minTime={moment("11:00", "HH:mm")}
                  maxTime={moment("20:00", "HH:mm")}
                  value={moment(OBJECT?.[`${extra}`], "HH:mm")}
                  skipDisabled={true}
                  onChange={(e: any) => {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      [`${extra}`]: moment(e).format("HH:mm")
                    }));
                    closePopup();
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        )}
        children={(popTrigger: any) => (
          <Input
            label={"시간"}
            shrink={"shrink"}
            variant={"outlined"}
            value={OBJECT?.[`${extra}`]}
            inputRef={REFS?.[i]?.[`${extra}`]}
            error={ERRORS?.[i]?.[`${extra}`]}
            readOnly={true}
            onClick={(e: any) => {
              popTrigger.openPopup(e.currentTarget)
            }}
          />
        )}
      />
    );
    return (
      <>
        {timeSection()}
      </>
    );
  };

  // 15. return ------------------------------------------------------------------------------------
  return (
    <>
      {timeNode()}
    </>
  );
};
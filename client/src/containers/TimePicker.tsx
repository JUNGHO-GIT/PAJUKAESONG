// Time.tsx

import { moment } from "@imports/ImportLibs";
import { PopUp, Input } from "@imports/ImportContainers";
import { Card } from "@imports/ImportMuis";
import { DigitalClock, AdapterMoment, LocalizationProvider } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
declare interface TimePickerProps {
  OBJECT: any;
  setOBJECT: any;
  REFS: any;
  ERRORS: any;
  extra: string;
  i: number;
}

// -------------------------------------------------------------------------------------------------
export const TimePicker = (
  { OBJECT, setOBJECT, REFS, ERRORS, extra, i }: TimePickerProps
) => {

  // 7. time ---------------------------------------------------------------------------------------
  const timeNode = () => {
    const timeSection = () => (
      <PopUp
        key={`${i}`}
        type={"innerCenter"}
        position={"center"}
        direction={"center"}
        padding={"20px"}
        contents={({closePopup}: any) => (
          <Card className={"w-50vw p-0"}>
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
          </Card>
        )}
      >
        {(popTrigger: any) => (
          <Input
            label={"시간"}
            variant={"standard"}
            value={OBJECT?.[`${extra}`]}
            inputRef={REFS?.[i]?.[`${extra}`]}
            error={ERRORS?.[i]?.[`${extra}`]}
            readOnly={true}
            onClick={(e: any) => {
              popTrigger.openPopup(e.currentTarget)
            }}
          />
        )}
      </PopUp>
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
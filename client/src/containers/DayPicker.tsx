// DayPicker.tsx
// 계획은 week, month, year, select
// 실제는 day

import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { Btn, Img, Div } from "@imports/ImportComponents";
import { PopUp, Input, Select } from "@imports/ImportContainers";
import { MenuItem, PickersDay, Grid, Card, Badge } from "@imports/ImportMuis";
import { DateCalendar, AdapterMoment, LocalizationProvider } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
declare interface DayPickerProps {
  OBJECT: any;
  setOBJECT: any;
  REFS: any;
  ERRORS: any;
  extra: string;
  i: number;
}

// -------------------------------------------------------------------------------------------------
export const DayPicker = (
  { OBJECT, setOBJECT, REFS, ERRORS, extra, i }: DayPickerProps
) => {

  // 1. common -------------------------------------------------------------------------------------
 const {
    getDayFmt, getDayNotFmt, getPrevMonthStartFmt, getNextMonthStartFmt
  } = useCommonDate();

  // 7. pickerNode ---------------------------------------------------------------------------------
  const pickerNode = () => {

    // 1. day --------------------------------------------------------------------------------------
    const daySection = () => (
      <PopUp
        key={`${i}`}
        type={"innerCenter"}
        position={"center"}
        direction={"center"}
        padding={"10px"}
        contents={({closePopup}: any) => (
          <Card className={"p-0"}>
            <Grid container spacing={3} columns={12} direction={"column"}>
              <Grid size={12} className={"d-center"}>
                <Div className={"fs-1-2rem fw-600"}>
                  날짜 선택
                </Div>
              </Grid>
              <Grid size={12} className={"d-center"}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"ko"}>
                  <DateCalendar
                    timezone={"Asia/Seoul"}
                    views={["day"]}
                    readOnly={false}
                    value={getDayNotFmt(OBJECT?.[`${extra}`])}
                    className={"border-1 radius"}
                    showDaysOutsideCurrentMonth={true}
                    slots={{
                      day: (props) => {
                        const { outsideCurrentMonth, day, ...other } = props;

                        let isSelected = false;
                        let color = "";
                        let borderRadius = "";
                        let backgroundColor = "";
                        let boxShadow = "";
                        let zIndex = 0;

                        if (OBJECT?.[`${extra}`]) {
                          isSelected = getDayFmt(OBJECT?.[`${extra}`]) === getDayFmt(day);
                        }

                        if (isSelected) {
                          color = "#ffffff";
                          backgroundColor = "#1976d2";
                          boxShadow = "0 0 0 0 #1976d2";
                          borderRadius = "50%";
                          zIndex = 10;
                        }
                        return (
                          <PickersDay
                            {...other}
                            day={day}
                            selected={isSelected}
                            outsideCurrentMonth={outsideCurrentMonth}
                            style={{
                              color: color,
                              borderRadius: borderRadius,
                              backgroundColor: backgroundColor,
                              boxShadow: boxShadow,
                              zIndex: zIndex,
                            }}
                            onDaySelect={(day) => {
                              setOBJECT((prev: any) => ({
                                ...prev,
                                [`${extra}`]: getDayFmt(day),
                              }));
                              closePopup();
                            }}
                          />
                        )
                      },
                      previousIconButton: (props) => (
                        <Btn
                          {...props}
                          className={"fs-1-4rem"}
                          onClick={() => {
                            setOBJECT((prev: any) => ({
                              ...prev,
                              [`${extra}`]: getPrevMonthStartFmt(prev[`${extra}`]),
                            }));
                          }}
                        >
                          {props.children}
                        </Btn>
                      ),
                      nextIconButton: (props) => (
                        <Btn
                          {...props}
                          className={"fs-1-4rem"}
                          onClick={() => {
                            setOBJECT((prev: any) => ({
                              ...prev,
                              [`${extra}`]: getNextMonthStartFmt(prev[`${extra}`]),
                            }));
                          }}
                        >
                          {props.children}
                        </Btn>
                      )
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Card>
        )}
      >
        {(popTrigger: any) => (
          <Input
            label={"날짜"}
            variant={"standard"}
            value={getDayFmt(OBJECT?.[`${extra}`])}
            readOnly={true}
            inputclass={""}
            inputRef={REFS?.[i]?.[`${extra}`]}
            error={ERRORS?.[i]?.[`${extra}`]}
            onClick={(e: any) => {
              popTrigger.openPopup(e.currentTarget);
            }}
          />
        )}
      </PopUp>
    );

    // 10. return
    return (
      <>
        {daySection()}
      </>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {pickerNode()}
    </>
  );
};
// PickerDay.tsx

import { useCommonDate } from "@importHooks";
import { PopUp, Input } from "@importContainers";
import { Btn, Div, Icons } from "@importComponents";
import { PickersDay, Grid } from "@importMuis";
import { DateCalendar, AdapterMoment, LocalizationProvider } from "@importMuis";

// -------------------------------------------------------------------------------------------------
declare type PickerDayProps = {
  OBJECT: any;
  setOBJECT: any;
  REFS?: any;
  ERRORS?: any;
  extra: string;
  variant?: string;
  i: number;
}

// -------------------------------------------------------------------------------------------------
export const PickerDay = (
  { OBJECT, setOBJECT, REFS, ERRORS, extra, variant, i }: PickerDayProps
) => {

  // 1. common -------------------------------------------------------------------------------------
 const { getDayFmt, getDayNotFmt, getPrevDayStartFmt, getNextDayStartFmt } = useCommonDate();
 const { getPrevMonthStartFmt, getNextMonthStartFmt } = useCommonDate();

  // 7. pickerNode ---------------------------------------------------------------------------------
  const pickerNode = () => {

    // 1. day --------------------------------------------------------------------------------------
    const daySection = () => (
      <PopUp
        type={"innerCenter"}
        position={"center"}
        direction={"center"}
        contents={({closePopup}: any) => (
          <Grid container={true} spacing={2} className={"w-min70vw"}>
            <Grid size={12} className={"d-row-center"}>
              <Div className={"fs-1-2rem fw-600 me-10"}>
                날짜 선택
              </Div>
              <Div className={"fs-0-8rem fw-500 dark"}>
                {`[${getDayFmt(OBJECT?.[`${extra}`])}]`}
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
        )}
        children={(popTrigger: any) => (
          <Input
            label={"날짜"}
            shrink={"shrink"}
            variant={variant || "outlined"}
            value={getDayFmt(OBJECT?.[`${extra}`])}
            readOnly={true}
            inputclass={""}
            inputRef={REFS?.[i]?.[`${extra}`]}
            error={ERRORS?.[i]?.[`${extra}`]}
            endadornment={
              <Div className={"d-row-center"}>
                <Div className={"me-n10"}>
                  <Icons
                    key={"ChevronLeft"}
                    name={"ChevronLeft"}
                    className={"w-16 h-16"}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setOBJECT((prev: any) => ({
                        ...prev,
                        [`${extra}`]: getPrevDayStartFmt(prev[`${extra}`]),
                      }));
                    }}
                  />
                </Div>
                <Div className={"me-n15"}>
                  <Icons
                    key={"ChevronRight"}
                    name={"ChevronRight"}
                    className={"w-16 h-16"}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setOBJECT((prev: any) => ({
                        ...prev,
                        [`${extra}`]: getNextDayStartFmt(prev[`${extra}`]),
                      }));
                    }}
                  />
                </Div>
              </Div>
            }
            onClick={(e: any) => {
              popTrigger.openPopup(e.currentTarget);
            }}
          />
        )}
      />
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
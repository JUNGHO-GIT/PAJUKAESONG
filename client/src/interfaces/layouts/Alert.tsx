// Alert.tsx

import { useStoreAlert } from "@importHooks";
import { Icons } from "@importComponents";
import { Snackbar, Alert as MuiAlert } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Alert = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { ALERT, setALERT } = useStoreAlert();

  // 7. alert --------------------------------------------------------------------------------------
  const alertNode = () => (
    <Snackbar
      open={ALERT.open}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      onClose={() => {
        setALERT({
          open: false
        });
      }}
    >
      <MuiAlert
        severity={ALERT.severity === "error" ? "error" : "info"}
        variant={"standard"}
        className={"w-95vw h-8vh d-center border-dark radius-2 shadow-2 fs-1-0rem fw-600 snackbar z-10000"}
        action={
          <>
            <Icons
              key={"Check"}
              name={"Check"}
              className={"w-24px h-24px black"}
              onClick={() => {
                setALERT({
                  open: false
                });
              }}
            />
          </>
        }
      >
        {ALERT.msg}
      </MuiAlert>
    </Snackbar>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {alertNode()}
    </>
  );
};

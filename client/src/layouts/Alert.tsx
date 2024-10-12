// Alert.tsx

import { useAlertStore } from "@imports/ImportStores";
import { Icons } from "@imports/ImportComponents";
import { Snackbar, Alert as MuiAlert } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Alert = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { ALERT, setALERT } = useAlertStore();

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
        className={"w-100p h-9vh d-center border-dark radius-1 shadow-2 fs-1-0rem fw-600 snackbar z-10000"}
        action={
          <>
            <Icons
              key={"Check"}
              name={"Check"}
              className={"w-24 h-24 black"}
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

// Input.tsx

import { TextField } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Input = (props: any) => (
  <TextField
    {...props}
    select={false}
    type={"text"}
    variant={props?.variant || "outlined"}
    size={props?.size || "small"}
    fullWidth={props?.fullWidth || true}
    className={props?.className || ""}
    inputRef={props?.inputRef || null}
    error={props?.error || false}
    slotProps={{
      input: {
        className: (
          props?.inputclass?.includes("fs-") ? (
            `text-left ${props?.inputclass || ""}`
          ) : (
            `fs-1-0rem text-left ${props?.inputclass || ""}`
          )
        ),
        readOnly: (
          props?.readOnly || false
        ),
        startAdornment: (
          props?.startadornment ? (
            typeof props?.startadornment === "string" ? (
              <div className={"ms-n10 me-2vw"}>
                <div className={"fs-0-6rem"}>
                  {props?.startadornment}
                </div>
              </div>
            ) : (
              <div className={"ms-n10 me-2vw"}>
                {props?.startadornment}
              </div>
            )
          ) : null
        ),
        endAdornment: (
          props?.endadornment ? (
            typeof props?.endadornment === "string" ? (
              <div className={"me-n10 ms-2vw"}>
                <div className={"fs-0-6rem"}>
                  {props?.endadornment}
                </div>
              </div>
            ) : (
              <div className={"me-n10 ms-2vw"}>
                {props?.endadornment}
              </div>
            )
          ) : null
        ),
      },
      inputLabel: {
        shrink: (props?.shrink === "shrink" ? true : undefined),
      }
    }}
  />
);
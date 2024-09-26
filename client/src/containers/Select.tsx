// Select.tsx

import { TextField } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Select = (props: any) => (
  <TextField
    {...props}
    select={true}
    type={props?.type || "text"}
    variant={props?.variant || "outlined"}
    size={props?.size || "small"}
    fullWidth={props?.fullWidth || true}
    className={(props?.variant === "standard" ? `${props?.className || ""} border-bottom-1` : props?.className || "")}
    inputRef={props?.inputRef || null}
    error={props?.error || false}
    slotProps={{
      ...props?.slotProps,
      input: {
        readOnly: (
          props?.readOnly || false
        ),
        className: (
          props?.inputclass?.includes("fs-") ? (
            `text-left ${props?.inputclass || ""}`
          ) : (
            `fs-1-0rem text-left ${props?.inputclass || ""}`
          )
        ),
        startAdornment: (
          props?.startadornment ? (
            typeof props?.startadornment === "string" ? (
              <div className={"ms-n5 me-1vw"}>
                <div className={"fs-0-6rem"}>
                  {props?.startadornment}
                </div>
              </div>
            ) : (
              <div className={"ms-n5 me-1vw"}>
                {props?.startadornment}
              </div>
            )
          ) : null
        ),
        endAdornment: (
          props?.endadornment ? (
            typeof props?.endadornment === "string" ? (
              <div className={"me-n5 ms-1vw"}>
                <div className={"fs-0-6rem"}>
                  {props?.endadornment}
                </div>
              </div>
            ) : (
              <div className={"me-n5 ms-1vw"}>
                {props?.endadornment}
              </div>
            )
          ) : null
        ),
      },
    }}
  />
);
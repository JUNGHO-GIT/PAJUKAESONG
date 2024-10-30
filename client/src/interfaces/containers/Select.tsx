// Select.tsx

import { TextField } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Select = (props: any) => (
  <TextField
    {...props}
    select={true}
    id={props?.id || `id-${Math.random().toString(36).slice(2, 11)}`}
    name={props?.name || `name-${Math.random().toString(36).slice(2, 11)}`}
    size={props?.size || "small"}
    type={props?.type || "text"}
    variant={props?.variant || "outlined"}
    className={props?.className || ""}
    fullWidth={props?.fullWidth || true}
    inputRef={props?.inputRef || null}
    error={props?.error || false}
    sx={{
      ...props?.sx,
      "& .MuiSelect-icon": {
        display: props?.disabled && "none"
      },
    }}
    slotProps={{
      ...props?.slotProps,
      input: {
        ...props?.slotProps?.input,
        readOnly: (
          (props?.readOnly || props?.className?.includes("pointer")) ? true : false
        ),
        disabled: (
          (props?.disabled || props?.locked === "locked") ? true : false
        ),
        className: (
          props?.inputclass?.includes("fs-") ? (
            `text-left ${props?.inputclass}`
          ) : (
            `fs-0-9rem text-left ${props?.inputclass}`
          )
        ),
        startAdornment: (
          props?.startadornment ? (
            typeof props?.startadornment === "string" ? (
              <div className={`d-center fs-0-6rem ${props?.adornmentclass || ""}`}>
                {props?.startadornment}
              </div>
            ) : (
              <div className={`d-center ${props?.adornmentclass || ""} me-2vw`}>
                {props?.startadornment}
              </div>
            )
          ) : null
        ),
        endAdornment: (
          props?.endadornment ? (
            typeof props?.endadornment === "string" ? (
              <div className={`d-center fs-0-6rem ${props?.adornmentclass || ""}`}>
                {props?.endadornment}
              </div>
            ) : (
              <div className={`d-center ${props?.adornmentclass || ""} ms-2vw`}>
                {props?.endadornment}
              </div>
            )
          ) : null
        ),
      },
      htmlInput: {
        ...props?.slotProps?.htmlInput,
        className: props?.inputclass?.includes("pointer") ? "pointer" : "",
      },
      inputLabel: {
        ...props?.slotProps?.inputLabel,
        shrink: ((props?.shrink === "shrink" || props?.disabled) ? true : undefined),
      }
    }}
  />
);
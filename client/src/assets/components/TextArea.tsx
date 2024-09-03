// TextArea.tsx

import { TextareaAutosize } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const TextArea = ({...props}: any) => {
  return (
    <TextareaAutosize
      {...props}
      className={props?.className || ""}
      style={{
        ...props?.style,
        fontFamily: "inherit",
        width: "100%",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #dbdbdb",
        resize: "none",
      }}
    />
  );
};
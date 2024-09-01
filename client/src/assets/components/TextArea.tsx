// TextArea.tsx

import { TextareaAutosize } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const TextArea = ({...props}: any) => {
  return (
    <TextareaAutosize
      {...props}
      style={{
        ...props?.style,
        width: "100%",
        padding: "20px",
        fontSize: "1.0rem",
        borderRadius: "10px",
        border: "1px solid #dbdbdb",
        resize: "none",
      }}
    />
  );
};
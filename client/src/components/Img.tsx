// Img.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const Img = (props: any) => {

  // 1. common -------------------------------------------------------------------------------------
  let { GCLOUD_URL } = useCommonValue();
  let groupProps: string = props.group;
  let srcProps: string = props.src;
  let fileName: string = "empty";
  let srcResult: string = "";
  let defaultImage: string = "https://via.placeholder.com/150";

  if (srcProps) {
    fileName = srcProps.split("/").pop()?.split(".")[0] || "empty";
    srcResult = groupProps === "new" ? srcProps : `${GCLOUD_URL}/${groupProps}/${srcProps}`;
  }

  // 2-1. useState ---------------------------------------------------------------------------------
  const [imgSrc, setImgSrc] = useState(srcResult);

  // 3. handle -------------------------------------------------------------------------------------
  const handleError = () => {
    setImgSrc(defaultImage);
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        {...props}
        src={imgSrc}
        alt={fileName}
        loading={"lazy"}
        onError={handleError}
      />
    </div>
  );
};

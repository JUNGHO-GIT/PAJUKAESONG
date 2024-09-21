// Img.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const Img = (props: any) => {

  // 1. common -------------------------------------------------------------------------------------
  const { GCLOUD_URL } = useCommonValue();
  const groupProps = props.group;
  const srcProps = props.src;
  const fileName = srcProps ? srcProps.split("/").pop().split(".")[0] : "empty";
  const srcResult = groupProps === "new" ? srcProps : `${GCLOUD_URL}/${groupProps}/${srcProps}`;
  const defaultImage = "https://via.placeholder.com/150";

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

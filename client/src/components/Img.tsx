// Img.tsx

import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const Img = (props: any) => {

  const {
    GCLOUD_URL
  } = useCommonValue();

  // group 속성 찾기
  const groupProps = props.group;

  // src 속성 찾기
  const srcProps = props.src;

  if (srcProps) {
    const fileName = srcProps.split("/").pop().split(".")[0];
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
          src={`${GCLOUD_URL}/${groupProps}/${srcProps}`}
          alt={fileName}
          loading={"lazy"}
        />
      </div>
    );
  }
  return null
};
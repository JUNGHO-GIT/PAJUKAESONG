// Img.tsx

// -------------------------------------------------------------------------------------------------
export const Img = (props: any) => {

  // src속성 찾기
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
          alt={fileName}
          loading={"eager"}
        />
      </div>
    );
  }
  return null
};
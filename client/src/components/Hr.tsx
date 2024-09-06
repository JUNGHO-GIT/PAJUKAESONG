// Hr.tsx

// -------------------------------------------------------------------------------------------------
export const Hr = (props : any) => {
  return (
    <div
      style={{
        "width": "100%",
        "background": "rgb(207 207 207)",
        "height": "2px",
        "margin": `${props?.px/2}px 0px`,
      }}
      className={props?.className}
    />
  );
}
// Br.tsx

// -------------------------------------------------------------------------------------------------
export const Br = (props: any) => (
  <div
    className={props?.className || ""}
    style={{
      "background": "none",
      "width": "100%",
      "height": "0.1px",
      "margin": `${props?.m / 2}px 0px`,
    }}
  />
);
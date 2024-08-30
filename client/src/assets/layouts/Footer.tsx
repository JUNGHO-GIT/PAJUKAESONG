// Footer.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useResponsive } from "@imports/ImportHooks";
import { Div, Img } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";
import { logo1, logo2 } from "@imports/ImportImages";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { isXs, isSm, isMd, isLg, isXl } = useResponsive();
  const [width, setWidth] = useState("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setWidth("w-100p");
    }
    else if (isSm) {
      setWidth("w-90p");
    }
    else if (isMd) {
      setWidth("w-70p");
    }
    else if (isLg) {
      setWidth("w-55p");
    }
    else if (isXl) {
      setWidth("w-40p");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => {
    const logoSection = () => (
      <Img
        src={logo1}
        className={`h-max50`}
      />
    );
    const textSection = () => (
      <Grid container spacing={1} className={"horizon-text"}>
        <Grid size={12} className={"fs-0-7rem"}>
          이코딩  |  주소: 서울특별시 강남구 역삼동
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          대표: 이코딩  |  사업자: 123-45-67890
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          전화: 02-123-4567  |  이메일: 123123@gmail.com
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          © 2021 이코딩. All rights reserved.
        </Grid>
      </Grid>
    );
    return (
      <Paper className={"layout-wrapper border-top p-30"}>
        <Grid container spacing={1}>
          <Grid
            size={{ xs: 12, sm: 6 }}
            className={"d-center"}
          >
            {logoSection()}
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            className={"d-center"}
          >
            {textSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {footerNode()}
    </>
  );
};
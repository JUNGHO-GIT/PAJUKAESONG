// Footer.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useResponsive } from "../../import/ImportHooks.tsx";
import { classNames } from "../../import/ImportLibs.tsx";
import { Div, Img, Br20, Br5, Br10 } from "../../import/ImportComponents.tsx";
import { Paper, Card, Grid } from "../../import/ImportMuis.tsx";
import { logo1, logo2 } from "../../import/ImportImages.tsx";

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
      <Div className={"d-column"}>
        <Div className={"fs-0-7rem"}>
          (주)이코딩  |  주소: 서울특별시 강남구 역삼동
        </Div>
        <Br5 />
        <Div className={"fs-0-7rem"}>
          대표: 이코딩  |  사업자: 123-45-67890
        </Div>
        <Br5 />
        <Div className={"fs-0-7rem"}>
          전화: 02-123-4567  |  이메일: 123123@gmail.com
        </Div>
      </Div>
    );
    return (
      <Paper className={"flex-wrapper p-relative border-top p-30"}>
        <Card className={`block-wrapper`}>
          {isXs ? (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                {logoSection()}
              </Grid>
              <Br20 />
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                {textSection()}
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                {logoSection()}
                <Div className={`w-10p`} />
                {textSection()}
              </Grid>
            </Grid>
          )}
        </Card>
      </Paper>
    )
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {footerNode()}
    </>
  );
};
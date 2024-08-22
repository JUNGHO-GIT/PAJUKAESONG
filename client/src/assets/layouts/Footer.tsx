// Footer.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { Paper, Card, Grid } from "../../import/ImportMuis.tsx";
import { useResponsive } from "../../import/ImportHooks.tsx";
import { Div, Img, Br20, Br5, Br10 } from "../../import/ImportComponents.tsx";
import { logo1, logo2 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { isXs, isSm, isMd, isLg, isXl } = useResponsive();
  const [width, setWidth] = useState("");

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
    const logoFragment = () => (
      <Grid container className={"d-center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={"d-center"}>
          <Img
            src={logo1}
            className={`h-max50`}
          />
        </Grid>
      </Grid>
    );
    const textFragment = () => (
      <Grid container className={"d-center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={"d-center"}>
          <Div className={"fs-0-7rem"}>
            (주)이코딩  |  주소: 서울특별시 강남구 역삼동
          </Div>
        </Grid>
        {isSm && <Br5 />}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={"d-center"}>
          <Div className={"fs-0-7rem"}>
            대표: 이코딩  |  사업자: 123-45-67890
          </Div>
        </Grid>
        {isSm && <Br5 />}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={"d-center"}>
          <Div className={"fs-0-7rem"}>
            전화: 02-123-4567  |  이메일: 123123@gmail.com
          </Div>
        </Grid>
      </Grid>
    );
    return (
      <Paper className={"flex-wrapper bottom-0vh radius border shadow-none"}>
        <Card className={`block-wrapper d-row shadow-none p-20 ${width}`}>
          <Grid container className={"d-center"}>
            {isXs ? (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                  {logoFragment()}
                </Grid>
                <Br20 />
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                  {textFragment()}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={`d-center`}>
                  {logoFragment()}
                  {textFragment()}
                </Grid>
              </>
            )}
          </Grid>
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
// Footer.tsx

import { React, useNavigate } from "../../import/ImportReacts.tsx";
import { Paper, Card, Grid, useMediaQuery, useTheme  } from "../../import/ImportMuis.tsx";
import { Div, Img, Br20, Br5, Br10 } from "../../import/ImportComponents.tsx";
import { logo1, logo2 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();

  // 3. media query --------------------------------------------------------------------------------
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => {
    const logoFragment = () => (
      <Div className={`d-center`}>
        <Img
          src={logo1}
          className={`h-max50`}
        />
      </Div>
    );
    const textFragment = () => (
      <Grid container className={"d-center"}>
        <Grid item xs={5} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            (주)이코딩
          </Div>
        </Grid>
        <Grid item xs={7} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            사업자: 123-45-67890
          </Div>
        </Grid>
        {isSmDown && <Br5 />}
        <Grid item xs={5} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            대표: 이코딩
          </Div>
        </Grid>
        <Grid item xs={7} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            주소: 서울특별시 강남구 역삼동
          </Div>
        </Grid>
        {isSmDown && <Br5 />}
        <Grid item xs={5} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            전화: 02-123-4567
          </Div>
        </Grid>
        <Grid item xs={7} sm={6} md={6} lg={6} xl={6} className={"d-center"}>
          <Div className={"fs-0-7rem fw-500 black"}>
            이메일: 123123@gmail.com
          </Div>
        </Grid>
      </Grid>
    );
    return (
      <Paper className={"flex-wrapper bottom-0vh radius border shadow-none"}>
        <Card className={"block-wrapper d-row w-100p shadow-none p-20"}>
          <Grid container>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} className={`d-center`}>
              {logoFragment()}
            </Grid>
            {isSmDown && <Br20 />}
            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} className={`d-center`}>
              {textFragment()}
            </Grid>
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
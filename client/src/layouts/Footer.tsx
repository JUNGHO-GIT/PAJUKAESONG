// Footer.tsx

import { useResponsive, useCommonValue } from "@imports/ImportHooks";
import { Div, Img, Icons } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate
  } = useCommonValue();
  const {
    isXs
  } = useResponsive();

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => {
    // 1. logo
    const logoSection = () => (
      <Img
        hover={false}
        shadow={false}
        group={"main"}
        src={"logo1_3.webp"}
        className={`pointer h-max50`}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    // 3. text
    const textSection = () => (
      <Grid container spacing={0} columns={12} className={`d-center horizontal-text`}>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-row-left'}`}>
          <Icons
            key={"Info"}
            name={"Info"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            대표: 강민서 | 사업자 등록번호: 883-03-03096
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-row-left'}`}>
          <Icons
            key={"Location"}
            name={"Location"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            주소: 경기 파주시 문산읍 방촌로 1675-34 1층
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-row-left'}`}>
          <Icons
            key={"Phone"}
            name={"Phone"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            전화: 031-952-8083
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-row-left'}`}>
          <Icons
            key={"Mail"}
            name={"Mail"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            이메일: sooookee@naver.com
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-row-left'}`}>
          <Icons
            key={"Copyright"}
            name={"Copyright"}
            className={"w-12 h-12"}
          />
          <Div
            className={"fs-0-8rem pointer"}
            onClick={() => {
              navigate("/user/login");
            }}
          >
            2024 파주개성면옥. All rights reserved.
          </Div>
        </Grid>
      </Grid>
    );
    // 4. return
    return (
      <Paper className={"layout-wrapper bg-ivory p-relative border-top-1 p-20"}>
        <Grid container spacing={2} columns={24}>
          <Grid size={{ xs: 24, sm: 10, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {logoSection()}
          </Grid>
          <Grid size={{ xs: 24, sm: 10, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
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
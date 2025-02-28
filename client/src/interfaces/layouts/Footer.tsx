// Footer.tsx

import { useResponsive, useCommonValue } from "@importHooks";
import { Div, Img, Icons, Paper, Grid } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate } = useCommonValue();
  const { xxs, xs } = useResponsive();

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => {
    // 1. logo
    const logoSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-center"}>
          <Img
            max={200}
            hover={false}
            shadow={false}
            radius={false}
            group={"main"}
            src={"logo1_2.webp"}
            onClick={() => {
              navigate("/main");
            }}
          />
        </Grid>
      </Grid>
    );
    // 3. text
    const textSection = () => (
      <Grid container={true} spacing={0} className={`horizontal`}>
        <Grid size={12} className={`d-row-${xxs || xs ? "center" : "left"}`}>
          <Icons
            key={"Info"}
            name={"Info"}
            className={"w-12px h-12px"}
          />
          <Div className={"fs-0-8rem"}>
            대표: 강민서 | 사업자 등록번호: 883-03-03096
          </Div>
        </Grid>
        <Grid size={12} className={`d-row-${xxs || xs ? "center" : "left"}`}>
          <Icons
            key={"Location"}
            name={"Location"}
            className={"w-12px h-12px"}
          />
          <Div className={"fs-0-8rem"}>
            경기 파주시 문산읍 방촌로 1675-34 1층
          </Div>
        </Grid>
        <Grid size={12} className={`d-row-${xxs || xs ? "center" : "left"}`}>
          <Icons
            key={"Phone"}
            name={"Phone"}
            className={"w-12px h-12px"}
          />
          <Div className={"fs-0-8rem"}>
            031-952-8083
          </Div>
        </Grid>
        <Grid size={12} className={`d-row-${xxs || xs ? "center" : "left"}`}>
          <Icons
            key={"Mail"}
            name={"Mail"}
            className={"w-12px h-12px"}
          />
          <Div className={"fs-0-8rem"}>
            sooookee@naver.com
          </Div>
        </Grid>
        <Grid size={12} className={`d-row-${xxs || xs ? "center" : "left"}`}>
          <Icons
            key={"Copyright"}
            name={"Copyright"}
            className={"w-12px h-12px"}
          />
          <Div className={"fs-0-8rem"}>
            2024 파주개성면옥. All rights reserved.
          </Div>
        </Grid>
      </Grid>
    );
    // 4. return
    return (
      <Paper className={"layout-wrapper p-relative shadow-top-4 border-0 radius-0 p-10px bg-ivory"}>
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
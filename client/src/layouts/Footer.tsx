// Footer.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useResponsive, useCommonValue } from "@imports/ImportHooks";
import { Div, Img, Icons, Input, Btn, Hr } from "@imports/ImportComponents";
import { Paper, Grid, Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();
  const {
    URL, isAdmin, adminId, adminPw, navigate, TITLE,
  } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [width, setWidth] = useState<string>("");
  const [OBJECT, setOBJECT] = useState<any>({
    user_id: adminId || "",
    user_pw: adminPw || "",
  });

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
    // 1. logo
    const logoSection = () => (
      <Img
        key={"logo1"}
        group={"main"}
        src={"logo1.webp"}
        className={`h-max50`}
      />
    );
    // 3. text
    const textSection = () => (
      <Grid container spacing={1} columns={12} className={`d-center horizontal-text`}>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-left'}`}>
          <Icons
            key={"Info"}
            name={"Info"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            대표: 강민서 | 사업자 등록번호: 883-03-03096
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-left'}`}>
          <Icons
            key={"Location"}
            name={"Location"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            주소: 경기 파주시 문산읍 방촌로 1675-34 1층
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-left'}`}>
          <Icons
            key={"Call"}
            name={"Call"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            전화: 031-952-8083
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-left'}`}>
          <Icons
            key={"Mail"}
            name={"Mail"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            이메일: sooookee@naver.com
          </Div>
        </Grid>
        <Grid size={12} className={`${isXs ? 'd-center' : 'd-left'}`}>
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
      <Paper className={"layout-wrapper border-top p-20 mt-20"}>
        <Grid container spacing={1} columns={24}>
          <Grid
            size={{ xs: 24, sm: 10, md: 12, lg: 12, xl: 12 }}
            className={`d-center ${isXs ? "mb-20" : ""}`}
          >
            {logoSection()}
          </Grid>
          <Grid
            size={{ xs: 24, sm: 14, md: 12, lg: 12, xl: 12 }}
            className={`d-center`}
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
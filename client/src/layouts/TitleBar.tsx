// TitleBar.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { Div } from "@imports/ImportComponents";
import { Grid, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const TitleBar = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH, location_category } = useCommonValue();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [objectHeight, setObjectHeight] = useState<string>("");
  const [objectBgColor, setObjectBgColor] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [titleColor, setTitleColor] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXxs) {
      setObjectHeight("h-15vh");
    }
    else if (isXs) {
      setObjectHeight("h-15vh");
    }
    else if (isSm) {
      setObjectHeight("h-20vh");
    }
    else if (isMd) {
      setObjectHeight("h-20vh");
    }
    else if (isLg) {
      setObjectHeight("h-25vh");
    }
    else if (isXl) {
      setObjectHeight("h-25vh");
    }
  }, [isXxs, isXs, isSm, isMd, isLg, isXl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (PATH.includes("about")) {
      setObjectBgColor("#ffffff");
      setTitleValue("회사 소개");
      setTitleColor("black");
    }
    else if (PATH.includes("menu")) {
      setObjectBgColor("#c6b9af");
      setTitleValue(location_category === "main" ? "대표 메뉴" : "사이드 메뉴");
      setTitleColor("white");
    }
    else if (PATH.includes("order")) {
      setObjectBgColor("#54908e");
      setTitleValue("주문 하기");
      setTitleColor("white");
    }
    else if (PATH.includes("product")) {
      setObjectBgColor("#54908e");
      setTitleValue("제품 목록");
      setTitleColor("white");
    }
    else if (PATH.includes("franchise")) {
      setObjectBgColor("#d9dbda");
      setTitleValue("가맹 지점");
      setTitleColor("white");
    }
    else if (PATH.includes("notice")) {
      setObjectBgColor("#4c94ac");
      setTitleValue("공지 사항");
      setTitleColor("white");
    }
    else if (PATH.includes("contact")) {
      setObjectBgColor("#dbe1dc");
      setTitleValue("문의 사항");
      setTitleColor("white");
    }
  }, [PATH, location_category, isXxs, isXs]);

  // 7. title --------------------------------------------------------------------------------------
  const titleNode = () => {
    const titleSection = () => (
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={"d-col-center"}>
          <Div className={"p-absolute w-100p h-100p d-col-center"}>
            <Div className={`fs-1-1rem fw-200 ${titleColor}`}>
              {"PAJU KAESONG"}
            </Div>
            <Div className={`fs-1-8rem fw-600 ${titleColor}`}>
              {titleValue}
            </Div>
          </Div>
        </Grid>
      </Grid>
    );
    return (
      <Paper className={`layout-wrapper p-relative border-bottom-1 z-100 bg-burgundy ${objectHeight}`}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            {titleSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {titleNode()}
    </>
  );
};

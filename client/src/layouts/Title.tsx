// Title.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { Div, Img, Br} from "@imports/ImportComponents";
import { Card, Grid, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Title = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH, location_category } = useCommonValue();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [objectHeight, setObjectHeight] = useState<string>("");
  const [objectBgColor, setObjectBgColor] = useState<string>("");
  const [imageGroup, setImageGroup] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
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
      setImageGroup("main");
      setImageUrl("title_about_3.jpg");
      setTitleValue("회사 소개");
      setTitleColor("black");
    }
    else if (PATH.includes("menu")) {
      setObjectBgColor("#c6b9af");
      setImageGroup("main");
      setImageUrl("title_menu_1.jpg");
      setTitleValue(location_category === "main" ? "대표 메뉴" : "사이드 메뉴");
      setTitleColor("white");
    }
    else if (PATH.includes("order")) {
      setObjectBgColor("#54908e");
      setImageGroup("main");
      setImageUrl("title_order_1.jpg");
      setTitleValue("주문 하기");
      setTitleColor("white");
    }
    else if (PATH.includes("product")) {
      setObjectBgColor("#54908e");
      setImageGroup("main");
      setImageUrl("title_order_1.jpg");
      setTitleValue("제품 목록");
      setTitleColor("white");
    }
    else if (PATH.includes("franchise")) {
      setObjectBgColor("#d9dbda");
      setImageGroup("main");
      setImageUrl("title_franchise_6.jpg");
      setTitleValue("가맹 지점");
      setTitleColor("white");
    }
    else if (PATH.includes("notice")) {
      setObjectBgColor("#4c94ac");
      setImageGroup("main");
      setImageUrl("title_notice_1.jpg");
      setTitleValue("공지 사항");
      setTitleColor("white");
    }
    else if (PATH.includes("contact")) {
      setObjectBgColor("#dbe1dc");
      setImageGroup("main");
      setImageUrl("title_contact_3.jpg");
      setTitleValue("문의 사항");
      setTitleColor("white");
    }
  }, [PATH, location_category, isXxs, isXs]);

  // 7. title --------------------------------------------------------------------------------------
  const titleNode = () => {
    const titleSection = () => (
      <Grid container spacing={0} columns={12}>
        <Grid size={12}>
          <Card className={"d-column-center"}>
            <Div className={"p-absolute w-100p h-100p d-column-center"}>
              <Div className={`fs-1-2rem fw-100 ${titleColor}`}>
                {"PAJU KAESONG"}
              </Div>
              <Br px={5} />
              <Div className={`fs-2-0rem fw-600 ${titleColor}`}>
                {titleValue}
              </Div>
            </Div>
          </Card>
        </Grid>
      </Grid>
    );
    return (
      <Grid container spacing={0} columns={12}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
          <Paper
            className={`layout-wrapper p-relative border-bottom-1 z-100 mb-30 ${objectHeight}`}
            style={{
              backgroundColor: "#973131"
            }}
          >
            {titleSection()}
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {titleNode()}
    </>
  );
};

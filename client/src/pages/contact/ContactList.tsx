// ContactList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useResponsive, useValidateContact } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { CONTACT } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId, location,
  } = useCommon();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([CONTACT]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/list`, {
      params: {
        contact_name: location.state?.contact_name || "",
        contact_email: location.state?.contact_email || "",
        PAGING: PAGING
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert("오류가 발생했습니다.");
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, PAGING]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        문의사항 목록
      </Div>
    );
    // 2. list
    const listSection = () => {
      const headFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={2}>
            <Div className={"fs-0-8rem fw-500"}>
              유형
            </Div>
          </Grid>
          <Grid size={{ xs: 10, sm: 7 }}>
            <Div className={"fs-0-8rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
            <Div className={"fs-0-8rem fw-500"}>
              작성일
            </Div>
          </Grid>
        </Grid>
      );
      const listFragment = () => (
        <Grid container spacing={2} columns={12}>
          {OBJECT?.map((item: any, index: number) => (
            <Grid container spacing={2} key={index}>
              <Grid size={{ xs: 2, sm: 2 }}>
                <Div className={"fs-1-0rem"}>
                  {item.contact_category === "franchise" ? "가맹 문의" : "1:1 문의"}
                </Div>
              </Grid>
              <Grid size={{ xs: 10, sm: 7 }}>
                <Div
                  className={"fs-1-0rem pointer-burgundy"}
                  onClick={() => {
                    navigate('/contact/detail', {
                      state: {
                        id: item._id
                      },
                    });
                  }}
                >
                  {item.contact_title}
                </Div>
              </Grid>
              <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
                <Div className={"fs-1-0rem"}>
                  {moment(item.contact_regDt).format("YYYY-MM-DD")}
                </Div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-30 fadeIn"}>
          {headFragment()}
          <Hr px={40} h={10} className={"bg-burgundy"} />
          {listFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs:12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {listSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};
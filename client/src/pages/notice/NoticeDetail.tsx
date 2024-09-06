// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { NOTICE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Icons, Btn, TextArea } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommon();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(NOTICE);
  const [STATE, setSTATE] = useState<any>({
    _id: location_id
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: STATE._id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result);
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        공지사항 상세
      </Div>
    );
    // 2. detail
    const detailSection = () => {
      const detailFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Div className={"fs-1-8rem fw-700"}>
              {OBJECT.notice_title}
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy"} />
          <Grid size={12}>
            <TextArea
              label={""}
              readOnly={true}
              inputclass={"h-min50vh readonly"}
              value={OBJECT.notice_content}
            />
          </Grid>
        </Grid>
      );
      const filterFragment = () => (
        <Grid container spacing={1}>
          <Grid size={6} className={"d-left"}>
            <Icons
            name={"Calendar"} className={"w-20 h-20"} />
            <Div className={"fs-1-0rem fw-500"}>
              {moment(OBJECT.notice_regDt).format("YYYY-MM-DD")}
            </Div>
          </Grid>
          <Grid size={6} className={"d-right"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-5"}
              onClick={() => {
                navigate("/notice/list");
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 12} className={"d-left"}>
            <Icons
            name={"View"} className={"w-20 h-20"} />
            <Div className={"fs-1-0rem fw-500"}>
              {OBJECT.notice_view || "0"}
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate("/notice/update", {
                  state: {
                    id: OBJECT._id
                  }
                });
              }}
            >
              수정하기
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-30 fadeIn"}>
          {detailFragment()}
          <Br px={50} />
          <Hr px={30} className={"bg-grey"} />
          {filterFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {detailSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {detailNode()}
    </>
  );
};
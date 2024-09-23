// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Hr, Icons, TextArea } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
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
      setOBJECT(res.data.result || Notice);
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = () => {
    setLOADING(true);
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: STATE._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate("/notice/list");
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  };

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
    const detailSection = (i: number) => (
      <Card className={"border-1 radius shadow p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              {OBJECT.notice_title}
            </Div>
          </Grid>
          <Hr px={10} h={10} className={"bg-burgundy"} />
          <Grid size={12}>
            <TextArea
              label={""}
              readOnly={true}
              inputclass={"h-min50vh readonly"}
              value={OBJECT.notice_content}
            />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={6} className={"d-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              className={"w-20 h-20"}
            />
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
              key={"View"}
              name={"View"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {OBJECT.notice_view}
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/notice/update", {
                  state: {
                    _id: OBJECT._id
                  }
                });
              }}
            >
              수정
            </Div>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                flowDelete();
              }}
            >
              삭제
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : detailSection(0)}
          </Grid>
          <Hr px={50} h={10} w={90} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection(0)}
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
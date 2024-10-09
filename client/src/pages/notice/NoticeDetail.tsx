// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Hr, Icons, Img, Br } from "@imports/ImportComponents";
import { TextArea } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Notice);
    })
    .catch((err: any) => {
      setALERT({
        open: !ALERT.open,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = () => {
    setLOADING(true);
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: OBJECT?._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
        navigate("/notice/list");
      }
      else {
        setALERT({
          open: !ALERT.open,
          severity: "error",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setALERT({
        open: !ALERT.open,
        severity: "error",
        msg: err.response.data.msg,
      });
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
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              공지사항 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => {
      const titleFragment = (i: number) => (
        <Card className={"p-0"} key={`title-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Div className={"fs-1-8rem fw-700 black"}>
                {OBJECT?.notice_title}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const descFragment = (i: number) => (
        <Card className={"p-0"} key={`desc-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <TextArea
                label={""}
                required={true}
                readOnly={true}
                value={OBJECT?.notice_content}
                inputclass={"h-35vh border-none"}
              />
            </Grid>
            <Grid size={10} className={"d-row-left"}>
              <Icons
                key={"Calendar"}
                name={"Calendar"}
                className={"w-20 h-20"}
              />
              <Div className={"fs-1-0rem fw-500"}>
                {getDayFmt(OBJECT?.notice_regDt)}
              </Div>
            </Grid>
            <Grid size={2} className={"d-row-right"}>
              <Icons
                key={"View"}
                name={"View"}
                className={"w-20 h-20"}
              />
              <Div className={"fs-1-0rem fw-500"}>
                {OBJECT?.notice_view}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"border-1 shadow-1 radius-1 p-20"}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              {titleFragment(0)}
              <Hr px={40} className={"bg-burgundy"} />
              {descFragment(0)}
            </Grid>
          </Grid>
        </Card>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate("/notice/list");
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-row-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/notice/update", {
                  state: {
                    _id: OBJECT?._id
                  }
                });
              }}
            >
              수정
            </Div>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-10"}
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
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {detailSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {filterSection()}
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
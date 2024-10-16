// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Hr, Icons, Img, Br } from "@imports/ImportComponents";
import { TextArea } from "@imports/ImportContainers";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { validate } = useValidateNotice();
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
  const flowDelete = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "delete")) {
      setLOADING(false);
      return;
    }
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
    // 2. detail
    const detailSection = () => {
      const headFragment = (item: any) => (
        <Grid container spacing={2} columns={12} className={"p-10"}>
          <Grid size={12}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {item?.notice_title}
            </Div>
          </Grid>
        </Grid>
      );
      const descFragment = (item: any) => (
        <Grid container spacing={2} columns={12} className={"px-10"}>
          <Grid size={12} className={"d-row-center"}>
            <TextArea
              label={""}
              readOnly={true}
              value={item?.notice_content}
              inputclass={"h-min50vh border-none"}
            />
          </Grid>
          <Grid size={9} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {getDayFmt(item?.notice_regDt)}
            </Div>
          </Grid>
          <Grid size={3} className={"d-row-right"}>
            <Icons
              key={"View"}
              name={"View"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500 me-10"}>
              {item?.notice_view}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-1 radius-1 shadow-1"}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} key={`detail-${0}`}>
            {headFragment(OBJECT)}
            <Hr px={20} className={"bg-burgundy"} />
            {descFragment(OBJECT)}
          </Grid>
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
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
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : detailSection()}
            <Hr px={40} className={"bg-grey"} />
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
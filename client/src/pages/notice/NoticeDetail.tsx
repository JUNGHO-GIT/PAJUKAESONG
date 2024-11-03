// NoticeDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate } from "@importHooks";
import { useStoreAlert, useValidateNotice, useResponsive } from "@importHooks";
import { axios } from "@importLibs";
import { Notice } from "@importSchemas";
import { Loader, Filter } from "@importLayouts";
import { TextArea } from "@importContainers";
import { Div, Hr, Icons } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { validate } = useValidateNotice();
  const { paperClass } = useResponsive();
  const { ALERT, setALERT } = useStoreAlert();

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
      setTimeout(() => {
        setLOADING(false);
      }, 300);
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
      setTimeout(() => {
        setLOADING(false);
      }, 300);
    });
  };

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 2. detail
    const detailSection = () => {
      const headFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`head-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Div className={"fs-1-8rem fw-700 black"}>
                    {item?.notice_title}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      const descFragment = () => (
        <Grid container={true} spacing={0} className={"px-10"}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`desc-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <TextArea
                    label={""}
                    readOnly={true}
                    value={item?.notice_content}
                    inputclass={"h-min50vh border-none"}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
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
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-1 shadow-1 p-20"}>
          {headFragment()}
          <Hr px={40} className={"bg-burgundy"} />
          {descFragment()}
        </Card>
      )
    };
    // 4. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={null}
        setPAGING={null}
        COUNT={null}
        flow={{
          flowDelete
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass}`}>
        {LOADING ? <Loader /> : (
          <>
            {detailSection()}
            <Hr px={40} className={"bg-grey"} />
            {filterSection()}
          </>
        )}
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
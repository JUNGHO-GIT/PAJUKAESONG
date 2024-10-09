// FranchiseDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Franchise);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Franchise);
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
        navigate(`/franchise/list`,{
          state: {
            category: OBJECT?.franchise_category
          }
        });
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
        <Grid container spacing={1} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              가맹점 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => {
      const imageFragment = (i: number) => (
        <Card className={"p-10"} key={`image-${i}`}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Img
                max={isXxs ? 270 : 320}
                hover={false}
                shadow={true}
                radius={true}
                group={"franchise"}
                src={OBJECT?.franchise_images?.[0]}
              />
            </Grid>
          </Grid>
        </Card>
      );
      const descFragment = (i: number) => (
        <Card className={"px-20"} key={`desc-${i}`}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Div className={"fs-1-8rem fw-700 black"}>
                {OBJECT?.franchise_name}
              </Div>
            </Grid>
            <Grid size={12} className={"d-column-left"}>
              <Div className={"d-row-left"}>
                <Icons
                  key={"Location"}
                  name={"Location"}
                  className={"w-20 h-20"}
                  fill={"whitesmoke"}
                />
                <Div className={"fs-0-9rem ms-5"}>
                  {OBJECT?.franchise_address_main}
                </Div>
                <Div className={"fs-0-9rem ms-10"}>
                  {`(${OBJECT?.franchise_address_detail})`}
                </Div>
              </Div>
              <Div className={"d-row-left"}>
                <Icons
                  key={"Phone"}
                  name={"Phone"}
                  className={"w-20 h-20"}
                  fill={"whitesmoke"}
                />
                <Div className={"fs-0-9rem ms-5"}>
                  {OBJECT?.franchise_phone}
                </Div>
              </Div>
              <Div className={"d-row-left"}>
                <Icons
                  key={"Calendar"}
                  name={"Calendar"}
                  className={"w-20 h-20"}
                  fill={"whitesmoke"}
                />
                <Div className={"fs-0-9rem ms-5"}>
                  {getDayFmt(OBJECT?.franchise_regDt)}
                </Div>
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={1} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            {imageFragment(0)}
            <Hr px={40} w={90} className={"bg-burgundy"} />
            {descFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-30"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate(`/franchise/list`,{
                  state: {
                    category: OBJECT?.franchise_category
                  }
                });
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-row-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/franchise/update", {
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
        <Grid container spacing={1} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {LOADING ? <Loading /> : detailSection()}
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
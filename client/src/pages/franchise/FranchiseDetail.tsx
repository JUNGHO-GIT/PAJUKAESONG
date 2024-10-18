// FranchiseDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateFranchise } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Img, Hr, Icons } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();
  const { validate } = useValidateFranchise();

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
    // 2. detail
    const detailSection = () => {
      const imageFragment = (item: any) => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <Img
              max={isXxs ? 600 : 700}
              hover={false}
              shadow={true}
              radius={true}
              group={"franchise"}
              src={item.franchise_images && item.franchise_images[0]}
            />
          </Grid>
        </Grid>
      );
      const descFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {item?.franchise_name}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Location"}
              name={"Location"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500 light-black"}>
              {`${item?.franchise_address_main} (${item?.franchise_address_detail})`}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Phone"}
              name={"Phone"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500 light-black"}>
              {item?.franchise_phone}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500 light-black"}>
              {getDayFmt(item?.franchise_regDt)}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"p-10"}>
          <Grid size={12} className={"d-col-center"} key={`detail-${0}`}>
            {imageFragment(OBJECT)}
            <Hr px={40} className={"bg-burgundy"} />
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
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-50"}>
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
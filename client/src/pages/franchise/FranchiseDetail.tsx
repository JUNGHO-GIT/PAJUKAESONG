// FranchiseDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Img, Hr, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommonValue();
  const {
    getDayFmt,
  } = useCommonDate();

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
      alert(err.response.data.msg);
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
        alert(res.data.msg);
        navigate(`/franchise/list`,{
          state: {
            category: OBJECT?.franchise_category
          }
        });
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
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        가맹점 상세
      </Div>
    );
    // 2. detail
    const detailSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Img
              max={450}
              hover={false}
              shadow={true}
              radius={false}
              group={"franchise"}
              src={OBJECT?.franchise_images?.[0]}
              className={"w-100p"}
            />
          </Grid>
          <Hr px={20} h={2} className={"bg-burgundy"} />
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {OBJECT?.franchise_name}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
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
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Phone"}
              name={"Phone"}
              className={"w-20 h-20"}
              fill={"whitesmoke"}
            />
            <Div className={"fs-0-9rem ms-5"}>
              {OBJECT?.franchise_phone}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              className={"w-20 h-20"}
              fill={"whitesmoke"}
            />
            <Div className={"fs-0-9rem ms-5"}>
              {getDayFmt(OBJECT?.franchise_regDt)}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {detailSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            <Hr px={20} className={"bg-grey"} />
            {filterSection(0)}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : detailNode()}
    </>
  );
};
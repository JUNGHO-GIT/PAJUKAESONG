// ProductDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios, numeral } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Div, Img, Hr } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Product);
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
      setOBJECT(res.data.result || Product);
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
        navigate(`/product/list`);
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
        상품 상세
      </Div>
    );
    // 2. detail
    const detailSection = (i: number) => (
      <Card className={"border radius shadow p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Img
              key={OBJECT.product_images[0]}
              src={OBJECT.product_images[0]}
              group={"product"}
              className={"w-300 h-300"}
            />
          </Grid>
          <Hr px={20} h={10} className={"bg-burgundy"} />
          <Grid size={6} className={"d-left"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {OBJECT.product_name}
            </Div>
          </Grid>
          <Grid size={6} className={"d-right"}>
            <Div className={"fs-1-2rem fw-600 black"}>
              {`₩ ${numeral(OBJECT.product_price).format("0,0")}`}
            </Div>
          </Grid>
          <Grid size={12} className={"d-left"}>
            <Div className={"fs-1-2rem fw-500 dark"}>
              {OBJECT.product_description}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-5"}
              onClick={() => {
                navigate(`/product/list`);
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/product/update", {
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
          <Hr px={20} h={10} w={90} className={"bg-grey"} />
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
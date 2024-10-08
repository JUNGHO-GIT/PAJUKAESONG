// MenuDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommonValue();
  const { isXxs } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Menu);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Menu);
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
        navigate(`/menu/list`,{
          state: {
            category: OBJECT?.menu_category
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
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              메뉴 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => {
      const imageFragment = (i: number) => (
        <Card className={"p-10"} key={`image-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Img
                max={isXxs ? 270 : 300}
                hover={false}
                shadow={true}
                radius={true}
                group={"menu"}
                src={OBJECT?.menu_images?.[0]}
              />
            </Grid>
          </Grid>
        </Card>
      );
      const descFragment = (i: number) => (
        <Card className={"px-40"} key={`desc-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Div className={"fs-1-8rem fw-700 black"}>
                {OBJECT?.menu_name}
              </Div>
            </Grid>
            <Grid size={6} className={"d-row-left"}>
              <Div className={"fs-1-2rem fw-500 dark"}>
                {OBJECT?.menu_description}
              </Div>
            </Grid>
            <Grid size={6} className={"d-row-right"}>
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15 h-15 dark"}
              />
              <Div className={"fs-1-2rem fw-500 light-black"}>
                {numeral(OBJECT?.menu_price).format("0,0")}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            {imageFragment(0)}
            <Hr px={40} w={90} className={"bg-burgundy"} />
            {descFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 4. filter
    const filterSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate(`/menu/list`,{
                  state: {
                    category: OBJECT?.menu_category
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
                navigate("/menu/update", {
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
      {LOADING ? <Loading /> : detailNode()}
    </>
  );
};
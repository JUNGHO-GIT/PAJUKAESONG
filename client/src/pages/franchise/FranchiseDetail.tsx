// FranchiseDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@importHooks";
import { useStoreAlert, useValidateFranchise } from "@importHooks";
import { axios, Swiper, SwiperSlide, Pagination } from "@importLibs";
import { Loader } from "@importLayouts";
import { Franchise } from "@importSchemas";
import { Div, Img, Hr, Icons } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs, paperClass } = useResponsive();
  const { ALERT, setALERT } = useStoreAlert();
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
      setTimeout(() => {
        setLOADING(false);
      }, 300);
    });
  };

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 2. detail
    const detailSection = () => {
      const imageFragment = (item: any, i: number) => (
        <Grid container={true} spacing={0} key={`image-${i}`}>
          <Grid size={12} className={"d-col-center"}>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              className={"p-5"}
              pagination={{
                clickable: true,
                enabled: true,
                el: ".franchise-pagination",
              }}
              modules={[
                Pagination,
              ]}
            >
              {item?.franchise_images?.map((image: string, index: number) => (
                <SwiperSlide className={"w-100p h-100p"} key={`image-${index}`}>
                  <Img
                    max={isXxs ? 600 : 700}
                    hover={false}
                    shadow={true}
                    radius={true}
                    group={"franchise"}
                    src={image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"franchise-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      const descFragment = (item: any, i: number) => (
        <Grid container={true} spacing={2} key={`desc-${i}`}>
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
              className={"w-15 h-15 dark"}
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
              className={"w-15 h-15 dark"}
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
              className={"w-15 h-15 dark"}
            />
            <Div className={"fs-0-9rem fw-500 light-black"}>
              {getDayFmt(item?.franchise_regDt)}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"d-col-center"}>
          {imageFragment(OBJECT, 0)}
          <Hr px={40} className={"bg-burgundy"} />
          {descFragment(OBJECT, 0)}
        </Card>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
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
      <Paper className={paperClass}>
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
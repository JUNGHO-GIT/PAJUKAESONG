// FranchiseDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate, useResponsive, useValidateFranchise } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { axios, Swiper, SwiperSlide, Pagination } from "@importLibs";
import { Filter } from "@importLayouts";
import { Franchise } from "@importSchemas";
import { Div, Img, Hr, Icons, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const FranchiseDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { xxs, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();
  const { validate } = useValidateFranchise();

  // 2-1. useState ---------------------------------------------------------------------------------
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
      setLOADING(false);
      setOBJECT(res.data.result || Franchise);
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
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
        setLOADING(false);
        setALERT({
          open: true,
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
        setLOADING(false);
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
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
      const imageFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={0} key={`image-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-col-center"}>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    className={"p-5px"}
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
                          max={xxs ? 600 : 700}
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
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"franchise-pagination transform-none"} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      const descFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`desc-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"fs-1-8rem fw-700 black"}>
                    {item?.franchise_name}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Location"}
                    name={"Location"}
                    fill={"whitesmoke"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-0-9rem fw-500 black"}>
                    {`${item?.franchise_address_main} (${item?.franchise_address_detail})`}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Phone"}
                    name={"Phone"}
                    fill={"whitesmoke"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-0-9rem fw-500 black"}>
                    {item?.franchise_phone}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Calendar"}
                    name={"Calendar"}
                    fill={"whitesmoke"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-0-9rem fw-500 black"}>
                    {getDayFmt(item?.franchise_regDt)}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-0 shadow-0"}>
          {imageFragment()}
          <Hr m={40} className={"bg-burgundy h-2px"} />
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
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {detailSection()}
        <Hr m={60} className={"bg-light h-2px"} />
        {filterSection()}
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
// MenuDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateMenu } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios, Swiper, SwiperSlide, Pagination } from "@importLibs";
import { insertComma } from "@importScripts";
import { Filter } from "@importLayouts";
import { Menu } from "@importSchemas";
import { Div, Img, Hr, Icons } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const MenuDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { xxs, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();
  const { validate } = useValidateMenu();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Menu);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Menu);
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "delete")) {
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
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
        navigate(`/menu/list`,{
          state: {
            category: OBJECT?.menu_category
          }
        });
      }
      else {
        setALERT({
          open: true,
          severity: "error",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  };

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. detail
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
                      el: ".menu-pagination",
                    }}
                    modules={[
                      Pagination,
                    ]}
                  >
                    {item?.menu_images?.map((image: string, index: number) => (
                      <SwiperSlide className={"w-100p h-100p"} key={`image-${index}`}>
                        <Img
                          max={xxs ? 600 : 700}
                          hover={false}
                          shadow={true}
                          radius={true}
                          group={"menu"}
                          src={image}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"menu-pagination transform-none"} />
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
                    {item?.menu_name}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Dot"}
                    name={"Dot"}
                    fill={"grey"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-1-2rem fw-500 black"}>
                    {item?.menu_description}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Won"}
                    name={"Won"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-1-1rem fw-500 black"}>
                    {insertComma(item?.menu_price || "0")}
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
        <Hr m={60} className={"bg-light h-5px"} />
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
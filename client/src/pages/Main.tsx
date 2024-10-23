// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { Swiper, SwiperSlide, Autoplay, axios } from "@imports/ImportUtils";
import { Pagination } from "@imports/ImportUtils";
import { Menu, Notice } from "@imports/ImportSchemas";
import { Location } from "@imports/ImportContainers";
import { Div, Img, Br, Hr } from "@imports/ImportComponents";
import { Grid, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, navigate } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [OBJECT_NOTICE, setOBJECT_NOTICE] = useState<any>([Notice]);
  const [category, setCategory] = useState<string>("main");
  const [PAGING, setPAGING] = useState<any>({
    sort: "desc",
    page: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    Promise.all([
      axios.get(`${URL}/api/menu/list`, {
        params: {
          PAGING: PAGING,
          category: category,
        }
      }),
      axios.get(`${URL}/api/notice/list`, {
        params: {
          PAGING: PAGING,
        }
      }),
      axios.get(`${URL}/api/admin/visitSave`, {
        params: {
          DATE: getDayFmt(),
        }
      })
    ])
    .then(([resMenu, resNotice]) => {
      setOBJECT_MENU(resMenu.data.result.length > 0 ? resMenu.data.result : [Menu]);
      setOBJECT_NOTICE(resNotice.data.result.length > 0 ? resNotice.data.result : [Notice]);
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
  }, [URL, PAGING, category]);

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {

    // 2. menu -------------------------------------------------------------------------------------
    const menuSection = () => {
      const selectFragment = () => (
        <Grid container spacing={0} columns={12} className={"p-10"}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={`${category === "main" ? "bg-burgundy" : ""} border-1 radius-50 p-10 me-1vw hover`}>
              <Div
                className={`fs-0-8rem fw-600 ${category === "main" ? "white" : "black"}`}
                onClick={() => {
                  setCategory("main");
                }}
              >
                메인 메뉴
              </Div>
            </Div>
            <Div className={`${category === "side" ? "bg-burgundy" : ""} border-1 radius-50 p-10 ms-1vw hover`}>
              <Div
                className={`fs-0-8rem fw-600 ${category === "side" ? "white" : "black"}`}
                onClick={() => {
                  setCategory("side");
                }}
              >
                사이드 메뉴
              </Div>
            </Div>
          </Grid>
        </Grid>
      );
      const menuFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Swiper
              spaceBetween={30}
              slidesPerView={LOADING ? 0 : (
                isXxs ? 1 : isXs ? 1 : isSm ? 1 : isMd ? 1 : isLg ? 2 : isXl ? 2 : 2
              )}
              slidesPerGroup={1}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-20"}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                enabled: true,
                el: '.menu-pagination',
              }}
              modules={[
                Pagination,
                Autoplay,
              ]}
            >
              {OBJECT_MENU?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <Div className={"d-col-center"}>
                    <Img
                      hover={true}
                      shadow={true}
                      radius={true}
                      group={"menu"}
                      src={item?.menu_images && item?.menu_images[0]}
                      onClick={() => {
                        navigate("/menu/detail", {
                          state: {
                            _id: item?._id,
                            category: item?.menu_category
                          }
                        });
                      }}
                    />
                    <Br px={20} />
                    <Div max={10} className={"fs-1-2rem fw-600"}>
                      {item?.menu_name}
                    </Div>
                  </Div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      );
      const paginationFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"menu-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-1 py-20"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {selectFragment()}
            {menuFragment()}
            {paginationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 3. notice -----------------------------------------------------------------------------------
    const noticeSection = () => {
      const noticeFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Swiper
              spaceBetween={30}
              slidesPerView={LOADING ? 0 : (
                isXxs ? 1 : isXs ? 1 : isSm ? 1 : isMd ? 1 : isLg ? 2 : isXl ? 2 : 2
              )}
              slidesPerGroup={1}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-20"}
              pagination={{
                clickable: true,
                enabled: true,
                el: '.notice-pagination',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[
                Pagination,
                Autoplay,
              ]}
            >
              {OBJECT_NOTICE?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <Div className={"d-col-left bg-white border-1 radius-1 shadow-1 p-20"}>
                    <Img
                      max={200}
                      hover={true}
                      shadow={false}
                      radius={false}
                      group={"main"}
                      src={"logo1.webp"}
                      onClick={() => {
                        navigate("/notice/detail", {
                          state: {
                            _id: item?._id
                          }
                        });
                      }}
                    />
                    <Hr px={40} className={"bg-light-grey"} />
                    <Div max={20} className={"fs-1-0rem fw-600"}>
                      {item?.notice_title}
                    </Div>
                    <Br px={5} />
                    <Div className={"fs-0-8rem fw-500 grey"}>
                      {getDayFmt(item?.notice_regDt)}
                    </Div>
                  </Div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      );
      const paginationFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"notice-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"bg-ivory border-1 py-20"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {noticeFragment()}
            {paginationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 4. location ---------------------------------------------------------------------------------
    const locationSection = () => {
      const locationFragment = () => (
        <Grid container spacing={0} columns={12} className={"p-20"}>
          <Grid size={12} className={"d-center"}>
            <Location
              width={"100%"}
              height={"60vh"}
              className={"border-1 shadow-3 radius-1"}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-1 py-20"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {locationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 10. return ----------------------------------------------------------------------------------
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            {menuSection()}
            {noticeSection()}
            {locationSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {mainNode()}
    </>
  );
};
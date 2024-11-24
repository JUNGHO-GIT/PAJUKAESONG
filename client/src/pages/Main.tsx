// Main.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { Swiper, SwiperSlide, Autoplay, axios, Pagination } from "@importLibs";
import { Menu, Notice } from "@importSchemas";
import { Location } from "@importContainers";
import { Div, Img, Br, Hr } from "@importComponents";
import { Grid, Paper } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, navigate } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { xxs, xs, sm, md, lg, xl, isXxl } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [OBJECT_NOTICE, setOBJECT_NOTICE] = useState<any>([Notice]);
  const [category, setCategory] = useState<string>("main");
  const [PAGING, _setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
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
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  }, [URL, PAGING, category]);

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {

    // 2. menu -------------------------------------------------------------------------------------
    const menuSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={0} className={"p-0px"}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-6rem fw-700"}>
              메뉴 소개
            </Div>
          </Grid>
        </Grid>
      );
      const selectFragment = () => (
        <Grid container={true} spacing={0} className={"p-10px"}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={`${category === "main" ? "bg-burgundy" : ""} border-1 radius-50 p-10px mr-1vw hover`}>
              <Div
                className={`fs-0-8rem fw-600 ${category === "main" ? "white" : "black"}`}
                onClick={() => {
                  setCategory("main");
                }}
              >
                메인 메뉴
              </Div>
            </Div>
            <Div className={`${category === "side" ? "bg-burgundy" : ""} border-1 radius-50 p-10px ml-1vw hover`}>
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
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-center"}>
            <Swiper
              spaceBetween={30}
              slidesPerView={xxs ? 1 : xs ? 1 : sm ? 1 : md ? 1 : lg ? 2 : xl ? 2 : isXxl ? 2 : 2}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-20px"}
              autoplay={{
                delay: 2000,
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
                      max={600}
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
                    <Br m={20} />
                    <Div max={10} className={"fs-1-2rem fw-700"}>
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
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-center"}>
            <Div className={"menu-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      return (
        <Grid container={true} spacing={0} className={"bg-light-ivory border-dark-top-1px py-20px"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {titleFragment()}
            {selectFragment()}
            {menuFragment()}
            {paginationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 3. notice -----------------------------------------------------------------------------------
    const noticeSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={0} className={"p-0px"}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-6rem fw-700"}>
              공지사항
            </Div>
          </Grid>
        </Grid>
      );
      const noticeFragment = () => (
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-center"}>
            <Swiper
              spaceBetween={30}
              slidesPerView={xxs ? 1 : xs ? 1 : sm ? 1 : md ? 1 : lg ? 2 : xl ? 2 : isXxl ? 2 : 2}
              slidesPerGroup={1}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-20px"}
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
                  <Div className={"d-col-center bg-white border-1 radius-3 shadow-1 p-20px"}>
                    <Img
                      max={200}
                      hover={true}
                      shadow={false}
                      radius={false}
                      group={"main"}
                      src={"logo1_1.webp"}
                      onClick={() => {
                        navigate("/notice/detail", {
                          state: {
                            _id: item?._id
                          }
                        });
                      }}
                    />
                    <Hr m={40} className={"bg-light-grey"} />
                    <Div className={"w-100p d-col-left"}>
                      <Div max={20} className={"fs-1-0rem fw-700"}>
                        {item?.notice_title}
                      </Div>
                      <Br m={5} />
                      <Div className={"fs-0-8rem fw-500 grey"}>
                        {getDayFmt(item?.notice_regDt)}
                      </Div>
                    </Div>
                  </Div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      );
      const paginationFragment = () => (
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-center"}>
            <Div className={"notice-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      return (
        <Grid container={true} spacing={0} className={"bg-ivory border-dark-top-1px py-20px"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {titleFragment()}
            {noticeFragment()}
            {paginationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 4. location ---------------------------------------------------------------------------------
    const locationSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={0} className={"p-0px"}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-6rem fw-700"}>
              오시는 길
            </Div>
          </Grid>
        </Grid>
      );
      const locationFragment = () => (
        <Grid container={true} spacing={0} className={"p-20px"}>
          <Grid size={12} className={"d-center"}>
            <Location
              width={"100%"}
              height={"60vh"}
              className={"border-2 shadow-1 radius-2"}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container={true} spacing={0} className={"bg-light-ivory border-dark-top-1px py-20px"}>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }} className={"d-col-center"}>
            {titleFragment()}
            {locationFragment()}
          </Grid>
        </Grid>
      );
    };

    // 10. return ----------------------------------------------------------------------------------
    return (
      <Paper className={"content-wrapper fadeIn"}>
        {menuSection()}
        {noticeSection()}
        {locationSection()}
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
// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { Swiper, SwiperSlide, Autoplay, axios } from "@imports/ImportLibs";
import { Pagination } from "@imports/ImportLibs";
import { Menu, Notice } from "@imports/ImportSchemas";
import { Location } from "@imports/ImportContainers";
import { Div, Img, Br, Hr } from "@imports/ImportComponents";
import { Grid, Card, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, navigate
  } = useCommonValue();
  const {
    getDayFmt
  } = useCommonDate();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 1. common -------------------------------------------------------------------------------------
  const mainArray = ["main1.webp", "main2.webp", "main3.webp", "main4.webp", "main5.webp"];

  // 2-1. useState ---------------------------------------------------------------------------------
  const [category, setCategory] = useState<string>("main");
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [OBJECT_NOTICE, setOBJECT_NOTICE] = useState<any>([Notice]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });

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
    ])
    .then(([resMenu, resNotice]) => {
      setOBJECT_MENU(resMenu.data.result.length > 0 ? resMenu.data.result : [Menu]);
      setOBJECT_NOTICE(resNotice.data.result.length > 0 ? resNotice.data.result : [Notice]);
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    });
  }, [URL, PAGING, category]);

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {
    // 1. main
    const mainSection = (i: number) => (
      <Card className={"bg-white border-bottom-1 p-0 d-center fadeIn"} key={i}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center p-0"}>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={false}
              modules={[
                Autoplay,
              ]}
            >
              {mainArray.map((item: any, index: number) => (
                <SwiperSlide className={"d-center"} key={index}>
                  <Img
                    max={600}
                    hover={false}
                    shadow={false}
                    group={"main"}
                    src={item}
                    className={"w-100p h-auto radius-none"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. menu
    const menuSection = (i: number) => (
      <Card className={"bg-white border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              메뉴 소개
            </Div>
          </Grid>
          <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }} className={"d-row-center"}>
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
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Swiper
              spaceBetween={20}
              slidesPerView={isXs ? 2 : isSm ? 2 : isMd ? 3 : isLg ? 3 : 3}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-10"}
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
                item.menu_images.length > 0 && (
                  <SwiperSlide className={"d-center"} key={index}>
                    <Card className={"border-1 shadow-2 p-10 radius fadeIn"}>
                      <Img
                        max={220}
                        hover={true}
                        shadow={true}
                        group={"menu"}
                        src={item?.menu_images?.[0]}
                        className={"w-100p h-100p"}
                        onClick={() => {
                          navigate("/menu/detail", {
                            state: {
                              _id: item?._id
                            }
                          });
                        }}
                      />
                      <Hr px={30} className={"bg-burgundy"} />
                      <Div className={"d-column-center"}>
                        <Div className={"fs-1-2rem fw-600"}>
                          {item?.menu_name}
                        </Div>
                      </Div>
                    </Card>
                  </SwiperSlide>
                )
              ))}
            </Swiper>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"menu-pagination transform-none"} />
          </Grid>
        </Grid>
      </Card>
    );
    // 4. notice
    const noticeSection = (i: number) => (
      <Card className={"bg-ivory border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              공지사항
            </Div>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              centeredSlides={false}
              loop={true}
              navigation={false}
              className={"p-10"}
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
                <SwiperSlide className={"d-center"} key={index}>
                  <Card className={"border-1 shadow-2 p-20 radius fadeIn"}>
                    <Img
                      max={180}
                      hover={true}
                      shadow={false}
                      group={"main"}
                      src={"logo1.webp"}
                      className={"w-100p h-100p"}
                      onClick={() => {
                        navigate("/notice/detail", {
                          state: {
                            _id: item?._id
                          }
                        });
                      }}
                    />
                    <Hr px={30} className={"bg-light-grey"} />
                    <Div className={"d-column-left"}>
                      <Div className={"fs-1-2rem fw-600"} max={10}>
                        {item?.notice_title}
                      </Div>
                      <Br px={5} />
                      <Div className={"fs-0-8rem fw-500 grey"}>
                        {getDayFmt(item?.notice_regDt)}
                      </Div>
                    </Div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"notice-pagination transform-none"} />
          </Grid>
        </Grid>
      </Card>
    );
    // 5. location
    const locationSection = (i: number) => (
      <Card className={"bg-white border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              오시는 길
            </Div>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Card className={"border-1 shadow-3 radius fadeIn p-0"}>
              <Location
                width={"100%"}
                height={"60vh"}
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper d-center p-0"}>
        <Grid container spacing={0} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center p-0"}>
            {mainSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center p-0"}>
            {menuSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center p-0"}>
            {noticeSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center p-0"}>
            {locationSection(0)}
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
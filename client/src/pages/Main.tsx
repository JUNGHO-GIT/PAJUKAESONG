// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { Swiper, SwiperSlide, Autoplay, axios } from "@imports/ImportUtils";
import { Pagination } from "@imports/ImportUtils";
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
    dayFmt, getDayFmt
  } = useCommonDate();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 1. common -------------------------------------------------------------------------------------
  const mainArray = ["main1.webp", "main2.webp", "main3.webp", "main4.webp", "main5.webp"];

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [OBJECT_NOTICE, setOBJECT_NOTICE] = useState<any>([Notice]);
  const [category, setCategory] = useState<string>("main");
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
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
          date: dayFmt
        }
      })
    ])
    .then(([resMenu, resNotice]) => {
      setOBJECT_MENU(resMenu.data.result.length > 0 ? resMenu.data.result : [Menu]);
      setOBJECT_NOTICE(resNotice.data.result.length > 0 ? resNotice.data.result : [Notice]);
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, PAGING, category]);

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {

    // 1. main -------------------------------------------------------------------------------------
    const mainSection = () => {
      const imageFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={0} columns={12}>
            <Grid size={12}>
              <Swiper
                spaceBetween={0}
                slidesPerView={LOADING ? 0 : 1}
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
                      radius={false}
                      group={"main"}
                      src={item}
                      className={"w-100p"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            {imageFragment(0)}
          </Grid>
        </Grid>
      );
    };

    // 2. menu -------------------------------------------------------------------------------------
    const menuSection = () => {
      const titleFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                메뉴 소개
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const selectFragment = (i: number) => (
        <Card className={"p-10"} key={i}>
          <Grid container spacing={2} columns={12}>
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
        </Card>
      );
      const menuFragment = (i: number) => (
        <Card className={"p-20"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Swiper
                spaceBetween={20}
                slidesPerView={LOADING ? 0 : (
                  isXs ? 2 : isSm ? 2 : isMd ? 3 : isLg ? 3 : isXl ? 3 : 3
                )}
                centeredSlides={false}
                loop={true}
                navigation={false}
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
                      <Card className={"border-1 shadow-2 radius-1 p-10"}>
                        <Img
                          max={200}
                          hover={true}
                          shadow={false}
                          radius={false}
                          group={"menu"}
                          src={item?.menu_images?.[0]}
                          className={"w-100p"}
                          onClick={() => {
                            navigate("/menu/detail", {
                              state: {
                                _id: item?._id
                              }
                            });
                          }}
                        />
                        <Hr px={30} h={2} className={"bg-burgundy"} />
                        <Div className={"d-column-center"}>
                          <Div className={"fs-1-0rem fw-600"} max={10}>
                            {item?.menu_name}
                          </Div>
                          <Br px={5} />
                          <Div className={"fs-0-8rem grey"}>
                            {item?.menu_description}
                          </Div>
                        </Div>
                      </Card>
                    </SwiperSlide>
                  )
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Card>
      );
      const paginationFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Div className={"menu-pagination transform-none"} />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 10, md: 8 }}>
            {titleFragment(0)}
            {selectFragment(1)}
            {menuFragment(2)}
            {paginationFragment(3)}
          </Grid>
        </Grid>
      );
    };

    // 3. notice -----------------------------------------------------------------------------------
    const noticeSection = () => {
      const titleFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                공지사항
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const noticeFragment = (i: number) => (
        <Card className={"p-20"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Swiper
                spaceBetween={20}
                slidesPerView={LOADING ? 0 : 1}
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
                    <Card className={"border-1 shadow-2 radius-1 p-20"}>
                      <Img
                        max={180}
                        hover={true}
                        shadow={false}
                        radius={false}
                        group={"main"}
                        src={"logo1.webp"}
                        className={"w-100p"}
                        onClick={() => {
                          navigate("/notice/detail", {
                            state: {
                              _id: item?._id
                            }
                          });
                        }}
                      />
                      <Hr px={30} h={2} className={"bg-light-grey"} />
                      <Div className={"d-column-left"}>
                        <Div className={"fs-1-0rem fw-600"} max={20}>
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
          </Grid>
        </Card>
      );
      const paginationFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Div className={"notice-pagination transform-none"} />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 10, md: 8 }}>
            {titleFragment(0)}
            {noticeFragment(1)}
            {paginationFragment(2)}
          </Grid>
        </Grid>
      );
    };

    // 4. location ---------------------------------------------------------------------------------
    const locationSection = () => {
      const titleFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                오시는 길
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const locationFragment = (i: number) => (
        <Card className={"p-20"} key={i}>
          <Location
            width={"100%"}
            height={"60vh"}
            className={"border-1 shadow-3 radius-1"}
          />
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 10, md: 8 }}>
            {titleFragment(0)}
            {locationFragment(1)}
          </Grid>
        </Grid>
      );
    };

    // 7-10. return
    return (
      <Paper className={"content-wrapper p-0 fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            {mainSection()}
            <Hr px={20} className={"bg-light-grey"} />
            {menuSection()}
            <Hr px={20} className={"bg-light-grey"} />
            {noticeSection()}
            <Hr px={20} className={"bg-light-grey"} />
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
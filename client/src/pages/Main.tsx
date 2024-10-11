// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { Swiper, SwiperSlide, Autoplay, axios } from "@imports/ImportUtils";
import { Pagination } from "@imports/ImportUtils";
import { Menu, Notice } from "@imports/ImportSchemas";
import { Location } from "@imports/ImportContainers";
import { Div, Img, Br, Hr } from "@imports/ImportComponents";
import { Grid, Card, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, navigate } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

  // 1. common -------------------------------------------------------------------------------------
  const mainArray = ["main1.webp", "main2.webp", "main3.webp", "main4.webp", "main5.webp"];

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
          date: getDayFmt(),
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

    // 1. main -------------------------------------------------------------------------------------
    const mainSection = () => {
      const imageFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={0} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Swiper
                spaceBetween={0}
                slidesPerView={LOADING ? 0 : 1}
                slidesPerGroup={1}
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
        <Card className={"p-0"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              className={"d-column-center"}
              key={`list-${0}`}
            >
              {imageFragment()}
            </Grid>
          </Grid>
        </Card>
      );
    };

    // 2. menu -------------------------------------------------------------------------------------
    const menuSection = () => {
      const titleFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                메뉴 소개
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const selectFragment = () => (
        <Card className={"p-10"}>
          <Grid container spacing={1} columns={12}>
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
      const menuFragment = () => (
        <Card className={"p-10"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Swiper
                spaceBetween={0}
                slidesPerView={LOADING ? 0 : (
                  isXxs ? 2 : isXs ? 2 : isSm ? 2 : isMd ? 3 : isLg ? 3 : isXl ? 3 : 3
                )}
                slidesPerGroup={1}
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
                  <SwiperSlide className={"d-center"} key={index}>
                    <Card className={"d-column-center p-20"}>
                      <Img
                        max={isXxs ? 100 : 150}
                        hover={true}
                        shadow={true}
                        radius={true}
                        group={"menu"}
                        src={item?.menu_images && item?.menu_images[0]}
                        onClick={() => {
                          navigate("/menu/detail", {
                            state: {
                              _id: item?._id
                            }
                          });
                        }}
                      />
                      <Br px={10} />
                      <Div className={"fs-1-0rem fw-600"} max={10}>
                        {item?.menu_name}
                      </Div>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Card>
      );
      const paginationFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Div className={"menu-pagination transform-none"} />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"p-0"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }}
              className={"d-column-center"}
              key={`list-${0}`}
            >
              {titleFragment()}
              {selectFragment()}
              {menuFragment()}
              {paginationFragment()}
            </Grid>
          </Grid>
        </Card>
      );
    };

    // 3. notice -----------------------------------------------------------------------------------
    const noticeSection = () => {
      const titleFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                공지사항
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const noticeFragment = () => (
        <Card className={"p-20"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Swiper
                spaceBetween={20}
                slidesPerView={LOADING ? 0 : 1}
                slidesPerGroup={1}
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
                    <Card className={"d-column-left border-1 shadow-1 radius-1 p-20"}>
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
                      <Hr px={30} w={100} className={"bg-light-grey"} />
                      <Div className={"fs-1-0rem fw-600"} max={20}>
                        {item?.notice_title}
                      </Div>
                      <Br px={5} />
                      <Div className={"fs-0-8rem fw-500 grey"}>
                        {getDayFmt(item?.notice_regDt)}
                      </Div>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </Card>
      );
      const paginationFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Div className={"notice-pagination transform-none"} />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"p-0"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }}
              className={"d-column-center"}
              key={`list-${0}`}
            >
              {titleFragment()}
              {noticeFragment()}
              {paginationFragment()}
            </Grid>
          </Grid>
        </Card>
      );
    };

    // 4. location ---------------------------------------------------------------------------------
    const locationSection = () => {
      const titleFragment = () => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-8rem fw-700"}>
                오시는 길
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const locationFragment = () => (
        <Card className={"p-20"}>
          <Location
            width={"100%"}
            height={"60vh"}
            className={"border-1 shadow-3 radius-1"}
          />
        </Card>
      );
      return (
        <Card className={"p-0"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 10, md: 8, lg: 8, xl: 8 }}
              className={"d-column-center"}
              key={`list-${0}`}
            >
              {titleFragment()}
              {locationFragment()}
            </Grid>
          </Grid>
        </Card>
      );
    };

    // 7-10. return
    return (
      <Paper className={"content-wrapper p-0 fadeIn"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-column-center"}>
            {mainSection()}
            <Hr px={30} w={100} className={"bg-light-grey"} />
            {menuSection()}
            <Hr px={30} w={100} className={"bg-light-grey"} />
            {noticeSection()}
            <Hr px={30} w={100} className={"bg-light-grey"} />
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
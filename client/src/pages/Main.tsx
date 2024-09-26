// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { Swiper, SwiperSlide, Autoplay, axios } from "@imports/ImportLibs";
import { Pagination } from "@imports/ImportLibs";
import { Menu, Notice } from "@imports/ImportSchemas";
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
  const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;
  const mainArray = ["main1.webp", "main2.webp", "main3.webp", "main4.webp", "main5.webp"];

  // 2-1. useState ---------------------------------------------------------------------------------
  const [imageSize, setImageSize] = useState<string>("");
  const [category, setCategory] = useState<string>("main");
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [OBJECT_NOTICE, setOBJECT_NOTICE] = useState<any>([Notice]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const initMap = () => {
      if (window.naver && window.naver.maps) {
        const naverMaps = window.naver.maps;
        const location = new naverMaps.LatLng(37.864200, 126.780585);
        const mapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: naverMaps.Position.RIGHT_CENTER,
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: naverMaps.MapTypeControlStyle.BUTTON,
            position: naverMaps.Position.TOP_RIGHT,
          },
        };
        const newMap = new naverMaps.Map("map", mapOptions);
        const marker = new naverMaps.Marker({
          position: location,
          map: newMap,
        });
        const infoWindow = new naverMaps.InfoWindow({
          pixelOffset: new naverMaps.Point(0, -10),
          anchorSize: new naverMaps.Size(0, -5),
          backgroundColor: "#ffffff",
          borderColor: "#333333",
          borderWidth: 0.5,
          anchorSkew: false,
          disableAnchor: false,
          anchorColor: "#ffffff",
          content: `
          <div style="padding: 10px 10px 20px 10px;">
            <p style="font-size: 1.2rem; font-weight: 700;">파주개성면옥</p>
            <p style="font-size: 0.8rem;" font-weight: 500;>⊙ 경기 파주시 문산읍 방촌로 1675-34</p>
            <p style="font-size: 1.0rem;" font-weight: 500;>☎ 031-952-8083</p>
          </div>
          `,
        });
        naverMaps.Event.addListener(marker, "click", function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          }
          else {
            infoWindow.open(newMap, marker);
          }
        });
        infoWindow.open(newMap, marker);
      }
    };
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector(`script[src="${scriptSrc}"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  // 2-2. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setImageSize("w-120 h-120 object-contain hover");
    }
    else if (isSm) {
      setImageSize("w-140 h-140 object-contain hover");
    }
    else if (isMd) {
      setImageSize("w-160 h-160 object-contain hover");
    }
    else if (isLg) {
      setImageSize("w-180 h-180 object-contain hover");
    }
    else if (isXl) {
      setImageSize("w-200 h-200 object-contain hover");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

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
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center p-0"}>
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
                <SwiperSlide key={index}>
                  <Img
                    key={item}
                    src={item}
                    group={"main"}
                    className={"w-100p h-60vh object-cover p-0"}
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
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              메뉴 소개
            </Div>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={`border-1 radius-50 p-10 me-2vw hover ${category === "main" ? "bg-burgundy" : ""}`}>
              <Div
                className={`fs-0-8rem fw-600 ${category === "main" ? "white" : "black"}`}
                onClick={() => {
                  setCategory("main");
                }}
              >
                메인 메뉴
              </Div>
            </Div>
            <Div className={`border-1 radius-50 p-10 ms-2vw hover ${category === "side" ? "bg-burgundy" : ""}`}>
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
              slidesPerView={isXs ? 2 : isSm ? 2 : isMd ? 3 : isLg ? 4 : 4}
              centeredSlides={false}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={false}
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
                  <Card className={"border-1 p-20 radius shadow fadeIn"}>
                    <Img
                      key={item?.menu_images?.[0]}
                      src={item?.menu_images?.[0]}
                      group={"menu"}
                      className={imageSize}
                      onClick={() => {
                        navigate("/menu/detail", {
                          state: {
                            _id: item?._id
                          }
                        });
                      }}
                    />
                    <Hr px={50} className={"bg-light-grey"} />
                    <Div className={"fs-1-2rem fw-600"}>
                      {item?.menu_name}
                    </Div>
                  </Card>
                </SwiperSlide>
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
      <Card className={"bg-light-burgundy border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
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
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={false}
              pagination={{
                clickable: true,
                enabled: true,
                el: '.notice-pagination',
              }}
              modules={[
                Pagination,
                Autoplay,
              ]}
            >
              {OBJECT_NOTICE?.map((item: any, index: number) => (
                <SwiperSlide className={"d-center"} key={index}>
                  <Card className={"border-1 p-20 radius shadow fadeIn"}>
                    <Img
                      key={"logo1.webp"}
                      src={"logo1.webp"}
                      group={"main"}
                      className={imageSize}
                      onClick={() => {
                        navigate("/notice/detail", {
                          state: {
                            _id: item?._id
                          }
                        });
                      }}
                    />
                    <Hr px={50} className={"bg-light-grey"} />
                    <Div className={"d-column-left fs-1-0rem fw-600"} max={10}>
                      {item?.notice_title}
                    </Div>
                    <Br px={5} />
                    <Div className={"d-column-left fs-0-8rem fw-500 grey"}>
                      {getDayFmt(item?.notice_regDt)}
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
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              오시는 길
            </Div>
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            <Card className={"border-1 radius shadow fadeIn p-0"}>
              <Div
                key={"location"}
                id={"map"}
                style={{
                  width: "100%",
                  height: "50vh",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper d-center p-0"}>
        <Grid container spacing={0} columns={12}>
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
// Main.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { Swiper, SwiperSlide, axios } from "@imports/ImportLibs";
import { Pagination } from "@imports/ImportLibs";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Br, Hr } from "@imports/ImportComponents";
import { Grid, Card, Paper } from "@imports/ImportMuis";
import { Tabs, Tab, MenuItem, tabsClasses } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL
  } = useCommonValue();

  // 1. common -------------------------------------------------------------------------------------
  const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;
  const themeArray = ["smile1.webp", "smile2.webp", "smile3.webp", "smile4.webp", "smile5.webp"];

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT_MENU, setOBJECT_MENU] = useState<any>([Menu]);
  const [category, setCategory] = useState<string>("main");
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
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
              <div style="padding: 10px;">
                <h3>파주개성면옥</h3>
                <p>경기 파주시 문산읍 방촌로 1675-34</p>
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

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}/api/menu/list`, {
      params: {
        PAGING: PAGING,
        category: category,
      }
    })
    .then((res: any) => {
      setOBJECT_MENU(res.data.result.length > 0 ? res.data.result : [Menu]);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    });
  }, [URL, PAGING, category]);

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {
    // 1. theme
    const themeSection = (i: number) => (
      <Card className={"border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              centeredSlides={false}
              loop={true}
              navigation={false}
              pagination={{
                clickable: true,
                enabled: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
                el: '.theme-pagination',
              }}
              modules={[
                Pagination,
              ]}
            >
              {themeArray.map((item: any, index: number) => (
                <SwiperSlide className={"d-center"} key={index}>
                  <Card className={"border-1 p-20 radius shadow w-max25vw h-max25vw"}>
                    <Img
                      key={item}
                      src={item}
                      group={"main"}
                      className={"w-100p h-100p object-contain"}
                    />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid size={12} className={"d-center"}>
            <Div className={"theme-pagination transform-none"} />
          </Grid>
        </Grid>
      </Card>
    );
    // 2. menu
    const menuSection = (i: number) => (
      <Card className={"border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Tabs
              value={category || false}
              variant={"scrollable"}
              selectionFollowsFocus={true}
              scrollButtons={false}
              className={`w-100p`}
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
                "& .MuiTab-root": {
                  color: "black",
                },
                "& .MuiTabs-flexContainer": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            >
              <Tab
                label={"대표 메뉴"}
                value={"main"}
                className={"pointer-burgundy fs-1-1rem"}
                onClick={() => {
                  setCategory("main");
                }}
              />
              <Tab
                label={"사이드 메뉴"}
                value={"side"}
                className={"pointer-burgundy fs-1-1rem"}
                onClick={() => {
                  setCategory("side");
                }}
              />
            </Tabs>
          </Grid>
          <Grid size={12} className={"d-center"}>
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              centeredSlides={false}
              loop={true}
              navigation={false}
              pagination={{
                clickable: true,
                enabled: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
                el: '.menu-pagination',
              }}
              modules={[
                Pagination,
              ]}
            >
              {OBJECT_MENU?.map((item: any, index: number) => (
                <SwiperSlide className={"d-center"} key={index}>
                  <Card className={"border-1 p-20 radius shadow w-max25vw h-max25vw"}>
                    <Img
                      key={item?.menu_images?.[0]}
                      src={item?.menu_images?.[0]}
                      group={"menu"}
                      className={"w-100p h-100p object-contain hover"}
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
          <Grid size={12} className={"d-center"}>
            <Div className={"menu-pagination transform-none"} />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. info
    const infoSection = (i: number) => (
      <Card className={"border-1 p-20 d-center fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              가맹점 창업 안내
            </Div>
          </Grid>
          <Br px={5} />
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-0rem"}>
              1995년 개인 창업하였을 때부터, 프랜차이즈 회사를 운영하는 현재까지 ‘장사는 제 양심을 파는 것’이라고 생각하였기에 동기와 과정을 중요시하고, ‘성실, 공의, 정직’의 원칙 아래 공동선의식 동행(나에게도 남에게도 유익하게)을 (주)이삭의 사명으로 삼고, ‘정당하고 바른 기업’이 되고자 노력하며 ‘이삭’을 운영하고 있습니다.
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 4. location
    const locationSection = (i: number) => (
      <Card className={"border-1 p-20 d-center fadeIn"} key={i}>
        <Div
          key={"location"}
          id={"map"}
          style={{
            width: "100%",
            height: "40vh",
            borderRadius: "10px",
            border: "1px solid #dbdbdb",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Card>
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper d-center p-0"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center p-0"}>
            {themeSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center p-0"}>
            {menuSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center p-0"}>
            {infoSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center p-0"}>
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
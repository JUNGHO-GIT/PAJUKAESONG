// Main.tsx

import { useEffect } from "@imports/ImportReacts";
import { Swiper, SwiperSlide } from "@imports/ImportLibs";
import { SwiperPagination, SwiperNavigation, SwiperAutoplay } from "@imports/ImportLibs";
import { Div, Img, Br } from "@imports/ImportComponents";
import { Grid, Card, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {
  
  
  // 1. common -------------------------------------------------------------------------------------
  const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;
  const srcPre = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=";
  const scriptSrc = `${srcPre}${NAVER_MAPS_CLIENT_ID}`;

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

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {
    // 7-1. swiperSection
    const swiperSection = (i: number) => (
      <Card className={"border-none p-0 fadeIn"} key={i}>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[
            SwiperPagination,
            SwiperNavigation,
          ]}
          style={{
            width: "100%",
            height: 700,
          }}
        >
          <SwiperSlide>
            <Img
              src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800"}
              group={"new"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Img
              src={"https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=800"}
              group={"new"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Img
              src={"https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800"}
              group={"new"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Img
              src={"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800"}
              group={"new"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        </Swiper>
      </Card>
    );
    // 2. info
    const infoSection = (i: number) => (
      <Card className={"border-1 p-20 fadeIn"} key={i}>
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
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-0rem"}>
              힘들었던 시절 '이삭토스트'를 창업하여 자립할 수 있었고, 우연히 만난 한 어려운 부부의 자립을 도와드리는 일이 계기가 되어 '이삭토스트 1호 가맹점'이 탄생했습니다. 그렇게 만들어진 '(주)이삭'은 오늘날 수많은 가정에게 희망을 주고 길을 여는‘이삭토스트’가 되었습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-0rem"}>
              '이삭토스트'는 어쩌면 저와 가맹점주님들, 창업을 꿈꾸시는 예비 가맹 점주님께 '희망'의 다른 이름일지도 모르겠습니다. '이삭토스트'를 통해 고객과 가맹점주님들, 임직원 및 협력업체들이 더불어 행복하시기를 진심으로 바랍니다. 아울러 '이삭'이라는 이름의 뜻처럼, 기쁨과 웃음, 행복과 축복을 유통하는 삶이 되시기를 소망합니다.
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. location
    const locationSection = (i: number) => (
      <Card className={"border-1 border-bottom-none p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Div
            key={"location"}
            id={"map"}
            style={{
              width: "100%",
              height: "40vh",
            }}
          />
        </Grid>
      </Card>
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper d-center p-0"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center p-0"}>
            {swiperSection(0)}
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
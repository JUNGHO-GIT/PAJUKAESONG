// Main.tsx

import { Swiper, SwiperSlide } from "@imports/ImportLibs";
import { SwiperPagination, SwiperNavigation, SwiperAutoplay } from "@imports/ImportLibs";
import { Div, Img } from "@imports/ImportComponents";
import { Grid, Card, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const Main = () => {

  // 7. main ---------------------------------------------------------------------------------------
  const mainNode = () => {
    // 7-1. swiperSection
    const swiperSection = () => (
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
          height: 500,
        }}
      >
        <SwiperSlide>
          <Img
            src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800"}
            alt={"slide1"}
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
            alt={"slide2"}
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
            alt={"slide3"}
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
            alt={"slide4"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      </Swiper>
    );
    // 7-2. testSection
    const testSection = () => (
      <Grid container spacing={2} columns={24}>
        <Grid size={8}>
          <Div className={"border bg-dark white"}>size=8/24</Div>
        </Grid>
        <Grid container size={16}>
          <Grid size={12}>
            <Div className={"border bg-dark white"}>nested size=12/24</Div>
          </Grid>
          <Grid size={12}>
            <Div className={"border bg-dark white"}>nested size=12/24</Div>
          </Grid>
        </Grid>
        <Grid size={8}>
          <Div className={"border bg-dark white"}>size=8/24</Div>
        </Grid>
        <Grid container columns={12} size={16}>
          <Grid size={6}>
            <Div className={"border bg-dark white"}>nested size=6/12</Div>
          </Grid>
          <Grid size={6}>
            <Div className={"border bg-dark white"}>nested size=6/12</Div>
          </Grid>
        </Grid>
      </Grid>
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={1}>
          <Grid size={12}>
            {testSection()}
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
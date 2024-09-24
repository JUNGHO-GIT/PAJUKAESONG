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
    );
    // 7-10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
            {swiperSection()}
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
// TitleBar.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { Swiper, SwiperSlide, Autoplay } from "@imports/ImportUtils";
import { Div, Img, Icons } from "@imports/ImportComponents";
import { Grid, Paper } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const TitleBar = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH, location_category } = useCommonValue();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [objectHeight, setObjectHeight] = useState<string>("");
  const [objectBgColor, setObjectBgColor] = useState<string>("");
  const [titleBreadcrumb, setTitleBreadcrumb] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (PATH.includes("main")) {
      setObjectBgColor("bg-transparent");
    }
    else {
      setObjectBgColor("bg-burgundy");
    }
  }, [PATH]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXxs || isXs) {
      setObjectHeight(PATH.includes("main") ? "" : "h-15vh");
    }
    else if (isSm || isMd) {
      setObjectHeight(PATH.includes("main") ? "" : "h-20vh");
    }
    else if (isLg || isXl) {
      setObjectHeight(PATH.includes("main") ? "" : "h-25vh");
    }
  }, [PATH, isXxs, isXs, isSm, isMd, isLg, isXl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (PATH.includes("about")) {
      setTitleBreadcrumb(`브랜드 소개`);
      if (PATH.includes("about/greeting")) {
        setTitleValue("대표 인사말");
      }
      else if (PATH.includes("about/location")) {
        setTitleValue("오시는 길");
      }
    }
    else if (PATH.includes("menu")) {
      setTitleBreadcrumb(location_category === "main" ? "대표 메뉴" : "사이드 메뉴");
      if (PATH.includes("menu/list")) {
        setTitleValue("메뉴 목록");
      }
      else if (PATH.includes("menu/detail")) {
        setTitleValue("메뉴 상세");
      }
      else if (PATH.includes("menu/save")) {
        setTitleValue("메뉴 등록");
      }
      else if (PATH.includes("menu/update")) {
        setTitleValue("메뉴 수정");
      }
    }
    else if (PATH.includes("order")) {
      setTitleBreadcrumb(`주문 예약`);
      if (PATH.includes("order/list")) {
        setTitleValue("주문 목록");
      }
      else if (PATH.includes("order/detail")) {
        setTitleValue("주문 상세");
      }
      else if (PATH.includes("order/save")) {
        setTitleValue("주문 하기");
      }
      else if (PATH.includes("order/update")) {
        setTitleValue("주문 수정");
      }
      else if (PATH.includes("order/find")) {
        setTitleValue("주문 조회");
      }
    }
    else if (PATH.includes("product")) {
      setTitleBreadcrumb(`주문 예약`);
      if (PATH.includes("product/list")) {
        setTitleValue("상품 목록");
      }
      else if (PATH.includes("product/detail")) {
        setTitleValue("상품 상세");
      }
      else if (PATH.includes("product/save")) {
        setTitleValue("상품 등록");
      }
      else if (PATH.includes("product/update")) {
        setTitleValue("상품 수정");
      }
    }
    else if (PATH.includes("franchise")) {
      setTitleBreadcrumb(`가맹점`);
      if (PATH.includes("franchise/list")) {
        setTitleValue("가맹점 목록");
      }
      else if (PATH.includes("franchise/detail")) {
        setTitleValue("가맹점 상세");
      }
      else if (PATH.includes("franchise/save")) {
        setTitleValue("가맹점 등록");
      }
      else if (PATH.includes("franchise/update")) {
        setTitleValue("가맹점 수정");
      }
    }
    else if (PATH.includes("notice")) {
      setTitleBreadcrumb(`공지사항`);
      if (PATH.includes("notice/list")) {
        setTitleValue("공지사항 목록");
      }
      else if (PATH.includes("notice/detail")) {
        setTitleValue("공지사항 상세");
      }
      else if (PATH.includes("notice/save")) {
        setTitleValue("공지사항 등록");
      }
      else if (PATH.includes("notice/update")) {
        setTitleValue("공지사항 수정");
      }
    }
    else if (PATH.includes("contact")) {
      setTitleBreadcrumb(`고객 문의`);
      if (PATH.includes("contact/list")) {
        setTitleValue("문의 목록");
      }
      else if (PATH.includes("contact/detail")) {
        setTitleValue("문의 상세");
      }
      else if (PATH.includes("contact/save")) {
        setTitleValue("문의 등록");
      }
      else if (PATH.includes("contact/update")) {
        setTitleValue("문의 수정");
      }
      else if (PATH.includes("contact/find")) {
        setTitleValue("문의 조회");
      }
    }
    else if (PATH.includes("admin")) {
      setTitleBreadcrumb(`관리자`);
      if (PATH.includes("admin/dashboard")) {
        setTitleValue("대시보드");
      }
    }
    else if (PATH.includes("user")) {
      setTitleBreadcrumb(`사용자`);
      if (PATH.includes("user/login")) {
        setTitleValue("로그인");
      }
      else if (PATH.includes("user/signup")) {
        setTitleValue("회원가입");
      }
    }
  }, [PATH, location_category]);

  // 7. title --------------------------------------------------------------------------------------
  const titleNode = () => {
    const mainSection = () => (
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={"d-col-center"}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
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
            <SwiperSlide className={"d-col-center w-100p h-100p"}>
              <Img
                hover={false}
                shadow={false}
                radius={false}
                group={"new"}
                src={"/images/main/main1.jpg"}
              />
              <Div className={"d-col-center w-100p h-100p p-absolute opacity-4"}>
                <Div className={"fs-1-8rem fw-700 white ls-2"}>
                  정성을 담은 메밀 요리로
                </Div>
                <Div className={"fs-1-8rem fw-700 white ls-2"}>
                  건강한 맛을 선사합니다.
                </Div>
              </Div>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>
    );
    const titleSection = () => (
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={"d-row-center"}>
          <Div className={`mt-n3 me-n5`}>
            <Icons
              key={"Home"}
              name={"Home"}
              color={"indigo"}
              className={"w-20 h-20"}
            />
          </Div>
          <Div className={"fs-0-9rem fw-300 white ls-2"}>
            {`PAJU KAESONG`}
          </Div>
          <Div className={`fs-1-1rem fw-400 white ms-10 me-10`}>
            {`/`}
          </Div>
          <Div style={{
            fontSize: '1.1rem',
            fontWeight: 500,
            color: "rgb(255 255 255 / 80%)",
            letterSpacing: 4,
          }}>
            {titleBreadcrumb}
          </Div>
        </Grid>
        <Grid size={12} className={"d-row-center"}>
          <Div className={`fs-1-8rem fw-600 white`}>
            {titleValue}
          </Div>
        </Grid>
      </Grid>
    );
    return (
      <Paper className={`layout-wrapper p-relative border-bottom-1 border-top-1 z-100 fadeIn ${objectHeight} ${objectBgColor}`}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            {PATH.includes("main") ? mainSection() : titleSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {titleNode()}
    </>
  );
};

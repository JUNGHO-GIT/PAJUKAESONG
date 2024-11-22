// TitleBar.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue } from "@importHooks";
import { Swiper, SwiperSlide } from "@importLibs";
import { Div, Img, Icons } from "@importComponents";
import { Grid, Paper } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const TitleBar = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH, location_category } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [objectBgColor, setObjectBgColor] = useState<string>("");
  const [objectHeight, setObjectHeight] = useState<string>("");
  const [titleBreadcrumb, setTitleBreadcrumb] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (!PATH.includes("main")) {
      setObjectBgColor("bg-burgundy");
      setObjectHeight("h-15vh");
    }
    else {
      setObjectBgColor("transparent");
      setObjectHeight("");
    }
  }, [PATH]);

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
        setTitleBreadcrumb(`메뉴 등록`);
      }
      else if (PATH.includes("menu/update")) {
        setTitleValue("메뉴 수정");
        setTitleBreadcrumb(`메뉴 수정`);
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
      else if (PATH.includes("franchise/info")) {
        setTitleValue("가맹 안내");
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
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-col-center"}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            navigation={false}
            speed={1500}
            fadeEffect={{ crossFade: true }}
          >
            {["title_main1.webp", "title_main2.webp"].map((item: string, i: number) => (
              <SwiperSlide key={`slide-${i}`} className={"w-100p h-100p d-center"}>
                <Img
                  hover={false}
                  shadow={false}
                  radius={false}
                  group={"main"}
                  src={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    );
    const titleSection = () => (
      <Grid container={true} spacing={0}>
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
      <Paper className={`layout-wrapper p-relative border-dark-bottom-1 border-dark-top-1 z-100 fadeIn radius-0 ${objectHeight} ${objectBgColor}`}>
        {PATH.includes("main") ? mainSection() : titleSection()}
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
// FranchiseList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useResponsive } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { Swiper, SwiperSlide } from "@imports/ImportLibs";
import { SwiperPagination, SwiperNavigation, SwiperAutoplay } from "@imports/ImportLibs";
import { FRANCHISE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, Select, Btn, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
  } = useCommon();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([FRANCHISE]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/list`, {
      params: {
        PAGING: PAGING
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert("오류가 발생했습니다.");
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, PAGING]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        가맹 지점
      </Div>
    );
    // 2. list
    const listSection = () => {
      const listFragment = () => (
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
        >
          {OBJECT?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Grid container spacing={2} columns={12}>
                <Grid size={12} key={index} className={"d-center"}>
                  <Div className={"fs-1-8rem fw-700"}>
                    {item.franchise_name}
                  </Div>
                </Grid>
                <Hr px={40} h={10} className={"bg-burgundy"} />
                <Grid size={12} className={"d-center"}>
                  <Img
                    src={item.franchise_image[0]}
                    alt={item.franchise_name}
                    className={"w-100p h-300"}
                  />
                </Grid>
                <Grid size={12} className={"d-column"}>
                  <Div className={"d-left"}>
                    <Icons
                      key={"Location"}
                      name={"Location"}
                      className={"w-20 h-20"}
                    />
                    <Div className={"fs-0-9rem ms-5"}>
                      {item.franchise_address_main}
                    </Div>
                    <Div className={"fs-0-9rem ms-10"}>
                      {`(${item.franchise_address_detail})`}
                    </Div>
                  </Div>
                  <Div className={"d-left"}>
                    <Icons
                      key={"Call"}
                      name={"Call"}
                      className={"w-20 h-20"}
                    />
                    <Div className={"fs-0-9rem ms-5"}>
                      {item.franchise_phone}
                    </Div>
                  </Div>
                  <Div className={"d-left"}>
                    <Icons
                      key={"Calendar"}
                      name={"Calendar"}
                      className={"w-20 h-20"}
                    />
                    <Div className={"fs-0-9rem ms-5"}>
                      {moment(item.franchise_regDt).format("YYYY-MM-DD")}
                    </Div>
                  </Div>
                </Grid>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      );
      const filterFragment = () => (
        <Grid container spacing={2} className={"d-center"}>
          <Grid size={3}>
            <Select
              label={"정렬"}
              value={PAGING?.sort}
              inputclass={"h-min0 h-4vh"}
              onChange={(e: any) => (
                setPAGING((prev: any) => ({
                  ...prev,
                  sort: e.target.value
                }))
              )}
            >
              {["asc", "desc"]?.map((item: string) => (
                <MenuItem
                  key={item}
                  value={item}
                  selected={PAGING?.sort === item}
                  onChange={(e: any) => (
                    setPAGING((prev: any) => ({
                      ...prev,
                      sort: e.target.value
                    }))
                  )}
                >
                  <Div className={"fs-0-9rem"}>
                    {item === "asc" && "오름차순"}
                    {item === "desc" && "내림차순"}
                  </Div>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={isAdmin ? 7 : 9}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={COUNT.totalCnt}
              page={PAGING.page}
              showFirstButton={true}
              showLastButton={true}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPageChange={(event, newPage) => {
                setPAGING((prev: any) => ({
                  ...prev,
                  page: newPage
                }));
              }}
              onRowsPerPageChange={(event) => {
                setPAGING((prev: any) => ({
                  ...prev,
                  limit: parseFloat(event.target.value)
                }));
              }}
            />
          </Grid>
          <Grid size={isAdmin ? 2 : 0} className={`${isAdmin ? "" : "d-none"}`}>
            <Btn
              className={"bg-burgundy"}
              onClick={() => {
                navigate("/franchise/save");
              }}
            >
              등록
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-30 fadeIn"}>
          {listFragment()}
          <Hr px={40} h={10} className={"bg-grey"} />
          {filterFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {listSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};
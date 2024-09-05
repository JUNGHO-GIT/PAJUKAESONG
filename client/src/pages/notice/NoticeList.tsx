// NoticeList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useResponsive } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { NOTICE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, Select, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
  } = useCommon();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([NOTICE]);
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
        공지사항
      </Div>
    );
    // 2. list
    const listSection = () => {
      const listFragment =  (i: number) => (
        <Grid container spacing={2} key={i}>
          <Grid size={2}>
            <Div className={"fs-0-8rem fw-500"}>
              번호
            </Div>
          </Grid>
          <Grid size={{ xs: 10, sm: 7 }}>
            <Div className={"fs-0-8rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
            <Div className={"fs-0-8rem fw-500"}>
              작성일
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy h-2"} />
          {OBJECT?.map((item: any, index: number) => (
            <Grid container spacing={2} key={index}>
              <Grid size={2}>
                <Div className={"fs-1-0rem"}>
                  {item.notice_number}
                </Div>
              </Grid>
              <Grid size={{ xs: 10, sm: 7 }}>
                <Div
                  className={"fs-1-0rem pointer-burgundy"}
                  onClick={() => {
                    navigate('/notice/detail', {
                      state: {
                        id: item._id
                      },
                    });
                  }}
                >
                  {item.notice_title}
                </Div>
              </Grid>
              <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
                <Div className={"fs-1-0rem"}>
                  {moment(item.notice_regDt).format("YYYY-MM-DD")}
                </Div>
              </Grid>
            </Grid>
          ))}
        </Grid>
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
              color={"error"}
              onClick={() => {
                navigate("/notice/save");
              }}
            >
              작성하기
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-40 fadeIn"}>
          {listFragment(0)}
          <Br px={10} />
          <Hr px={30} className={"bg-grey h-2"} />
          {filterFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 11, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
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
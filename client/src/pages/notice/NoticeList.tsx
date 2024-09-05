// NoticeList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";
import { NOTICE } from "@imports/ImportBases";
import { axios } from "@imports/ImportLibs";
import { Div, Img, Hr, Br, Input, Select, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
  } = useCommon();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>([NOTICE]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 1
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
    sectionCnt: 0,
    newSectionCnt: 0
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}${SUBFIX}/list`)
    .then((res: any) => {
      setOBJECT(res.data.result);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
        sectionCnt: res.data.sectionCnt || 0,
        newSectionCnt: res.data.sectionCnt || 0
      }));
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      console.log(JSON.stringify(OBJECT, null, 2));
    });
  }, [URL, SUBFIX]);

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
      const emptyFragment = () => (
        <Card className={"border radius shadow p-30"}>
          <Grid container spacing={2} className={"text-center"}>
            <Grid size={2}>
              <Div className={"fs-0-8rem fw-500"}>
                번호
              </Div>
            </Grid>
            <Grid size={8}>
              <Div className={"fs-0-8rem fw-500"}>
                제목
              </Div>
            </Grid>
            <Grid size={2}>
              <Div className={"fs-0-8rem fw-500"}>
                작성일
              </Div>
            </Grid>
            <Hr px={10} className={"bg-burgundy"} />
            <Grid container spacing={2} className={"text-center"}>
              <Grid size={12}>
                <Div className={"fs-1-0rem"}>
                  공지사항이 없습니다.
                </Div>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      );
      const listFragment =  (i: number) => (
        OBJECT?.map((item: any, index: number) => (
          <Card className={"border radius shadow p-30"} key={index}>
            <Grid container spacing={2} className={"text-center"}>
              <Grid size={2}>
                <Div className={"fs-0-8rem fw-500"}>
                  번호
                </Div>
              </Grid>
              <Grid size={8}>
                <Div
                  className={"fs-0-8rem fw-500"}
                  onClick={() => {
                    navigate('/notice/detail', {
                      state: {
                        id: item._id
                      },
                    });
                  }}
                >
                  제목
                </Div>
              </Grid>
              <Grid size={2}>
                <Div className={"fs-0-8rem fw-500"}>
                  작성일
                </Div>
              </Grid>
              <Hr px={10} className={"bg-burgundy"} />
              <Grid key={index} container spacing={2} className={"text-left"}>
                <Grid size={2}>
                  <Div className={"fs-1-0rem"}>
                    {item.notice_number}
                  </Div>
                </Grid>
                <Grid size={8}>
                  <Div className={"fs-1-0rem"}>
                    {item.notice_title}
                  </Div>
                </Grid>
                <Grid size={2}>
                  <Div className={"fs-1-0rem"}>
                    {item.notice_regDt}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))
      );
      return (
        COUNT.totalCnt === 0 ? emptyFragment() : listFragment(0)
      );
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"border radius shadow pt-5 pb-5 ps-30 pe-30"}>
        <Grid container spacing={2} className={"text-center"}>
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
              rowsPerPage={10}
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
              작성
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {listSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection()}
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
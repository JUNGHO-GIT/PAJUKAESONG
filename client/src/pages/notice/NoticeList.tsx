// NoticeList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive, useCommonDate } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Empty } from "@imports/ImportContainers";
import { Div, Hr, Select, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
  } = useCommonValue();
  const {
    getDayFmt,
  } = useCommonDate();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([Notice]);
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
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Notice]);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
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
    const listSection = (i: number) => (
      <Card className={"border-1 radius shadow p-20 fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={2}>
            <Div className={"fs-0-8rem fw-500"}>
              번호
            </Div>
          </Grid>
          <Grid size={7}>
            <Div className={"fs-0-8rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={3}>
            <Div className={"fs-0-8rem fw-500"}>
              날짜
            </Div>
          </Grid>
        </Grid>
        <Hr px={40} h={10} className={"bg-burgundy"} />
        {OBJECT?.map((item: any, index: number) => (
          <Grid container spacing={2} key={index}>
            <Grid size={2}>
              <Div className={"fs-0-8rem"}>
                {item.notice_number}
              </Div>
            </Grid>
            <Grid size={7}>
              <Div
                className={"fs-1-0rem pointer-burgundy"}
                onClick={() => {
                  navigate('/notice/detail', {
                    state: {
                      _id: item._id
                    },
                  });
                }}
              >
                {item.notice_title}
              </Div>
            </Grid>
            <Grid size={3}>
              <Div className={"fs-0-8rem"}>
                {getDayFmt(item.notice_regDt)}
              </Div>
            </Grid>
            <Hr px={5} h={1} className={"mb-20"} />
          </Grid>
        ))}
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={4} className={"d-center"}>
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
          <Grid size={6} className={"d-center"}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={COUNT.totalCnt}
              page={PAGING.page}
              showFirstButton={true}
              showLastButton={true}
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
          <Grid size={2} className={`${isAdmin ? "d-center" : "d-none"}`}>
            <Btn
              className={"bg-burgundy"}
              onClick={() => {
                navigate("/notice/save");
              }}
            >
              {"등록"}
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : (
              COUNT.totalCnt <= 0 ? <Empty /> : listSection(0)
            )}
          </Grid>
          <Hr px={10} h={10} w={90} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection(0)}
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
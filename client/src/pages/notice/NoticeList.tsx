// NoticeList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Btn } from "@imports/ImportComponents";
import { Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate, isAdmin, } = useCommonValue();
  const { getDayNotFmt } = useCommonDate();
  const { ALERT, setALERT } = useAlertStore();

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
      setALERT({
        open: !ALERT.open,
        severity: "error",
        msg: err.response.data.msg,
      });
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
      <Card className={"p-0"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12}>
            <Div className={"fs-2-0rem fw-700"}>
              공지사항
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. list
    const listSection = () => {
      const headFragment = () => (
        <Card className={"p-20 border-bottom-1-burgundy"}>
          <Grid container spacing={2} columns={12}>
            <Grid size={3}>
              <Div className={"fs-0-8rem fw-500"}>
                번호
              </Div>
            </Grid>
            <Grid size={6}>
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
        </Card>
      );
      const listFragment = (item: any) => (
        <Card className={"p-20 border-bottom-1"}>
          <Grid container spacing={2} columns={12}>
            <Grid size={3}>
              <Div className={"fs-0-7rem"}>
                {item?.notice_number}
              </Div>
            </Grid>
            <Grid size={6}>
              <Div
                max={10}
                className={"fs-1-0rem pointer-burgundy"}
                onClick={() => {
                  navigate('/notice/detail', {
                    state: {
                      _id: item?._id
                    },
                  });
                }}
              >
                {item?.notice_title}
              </Div>
            </Grid>
            <Grid size={3}>
              <Div className={"fs-0-7rem"}>
                {getDayNotFmt(item?.notice_regDt).format("MM-DD")}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"border-1 radius-1 shadow-1"}>
          <Grid container spacing={0} columns={12}>
            {OBJECT.map((item: any, i: number) => (
              <Grid
                key={`list-${i}`}
                size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                className={"d-column-center"}
              >
                {i === 0 && headFragment()}
                {listFragment(item)}
              </Grid>
            ))}
          </Grid>
        </Card>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-10"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={3} className={"d-column-center"}>
            <Select
              label={""}
              value={PAGING?.sort}
              inputclass={"h-min0 h-5vh"}
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
                  <Div className={"fs-0-8rem"}>
                    {item === "asc" && "오름차순"}
                    {item === "desc" && "내림차순"}
                  </Div>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={7} className={"d-column-center"}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={COUNT.totalCnt}
              page={PAGING.page}
              showFirstButton={true}
              showLastButton={true}
              className={"border-bottom-1"}
              onPageChange={(_event, newPage) => {
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
          <Grid size={2} className={`${isAdmin ? "d-column-center" : "d-none"}`}>
            <Btn
              className={"bg-burgundy fs-0-7rem"}
              onClick={() => {
                navigate("/notice/save");
              }}
            >
              등록
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn px-20"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={{ xs: 12, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {LOADING ? <Loading /> : listSection()}
            <Hr px={40} className={"bg-grey"} />
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
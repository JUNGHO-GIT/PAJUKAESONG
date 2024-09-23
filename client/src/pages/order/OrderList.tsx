// OrderList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Empty } from "@imports/ImportContainers";
import { Div, Hr, Select } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, location,
  } = useCommonValue();
  const {
    isXs
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([Order]);
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
        order_name: location.state?.order_name || "",
        order_email: location.state?.order_email || "",
        PAGING: PAGING
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Order]);
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
        주문 목록
      </Div>
    );
    // 2. list
    const listSection = (i: number) => (
      <Card className={"border-1 radius shadow p-30 fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 5, sm: 2 }}>
            <Div className={"fs-0-8rem fw-500"}>
              유형
            </Div>
          </Grid>
          <Grid size={{ xs: 7, sm: 7 }}>
            <Div className={"fs-0-8rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
            <Div className={"fs-0-8rem fw-500"}>
              작성일
            </Div>
          </Grid>
        </Grid>
        <Hr px={40} h={10} className={"bg-burgundy"} />
        {OBJECT?.map((item: any, index: number) => (
          <Grid container spacing={2} key={index}>
            <Grid size={{ xs: 5, sm: 2 }}>
              <Div className={"fs-1-0rem"}>
                {item.order_category === "franchise" ? "가맹 주문" : "1:1 주문"}
              </Div>
            </Grid>
            <Grid size={{ xs: 7, sm: 7 }}>
              <Div
                className={"fs-1-0rem pointer-burgundy"}
                onClick={() => {
                  navigate('/order/detail', {
                    state: {
                      _id: item._id
                    },
                  });
                }}
              >
                {item.order_title}
              </Div>
            </Grid>
            <Grid size={{ xs: 0, sm: 3 }} className={`${isXs ? "d-none" : ""}`}>
              <Div className={"fs-1-0rem"}>
                {moment(item.order_regDt).format("YYYY-MM-DD")}
              </Div>
            </Grid>
          </Grid>
        ))}
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
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
          <Grid size={8} className={"d-center"}>
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
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : (
              COUNT.totalCnt <= 0 ? <Empty /> : listSection(0)
            )}
          </Grid>
          <Hr px={50} h={10} w={90} className={"bg-grey"} />
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
// AdminDashboard.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Admin, Order } from "@imports/ImportSchemas";
import { Div, Hr, Br } from "@imports/ImportComponents";
import { PickerDay, Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AdminDashboard = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX
  } = useCommonValue();
  const {
    dayFmt, getDayFmt
  } = useCommonDate();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Admin);
  const [OBJECT_ORDER, setOBJECT_ORDER] = useState<any>([Order]);
  const [ORDER_PAGING, setORDER_PAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [ORDER_COUNT, setORDER_COUNT] = useState<any>({
    totalCnt: 0,
  });
  const [DATE, setDATE] = useState<any>({
    today: dayFmt
  });

  useEffect(() => {
    console.log("===================================");
    console.log("OBJECT", JSON.stringify(OBJECT, null, 2));
    console.log("OBJECT_ORDER", JSON.stringify(OBJECT_ORDER, null, 2));
    console.log("ORDER_COUNT", JSON.stringify(ORDER_COUNT, null, 2));
  }, [OBJECT, OBJECT_ORDER, ORDER_COUNT]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    Promise.all([
      axios.get(`${URL}${SUBFIX}/visitCount`, {
        params: {
          date: DATE?.today
        }
      }),
      axios.get(`${URL}${SUBFIX}/orderList`, {
        params: {
          date: DATE?.today,
          PAGING: ORDER_PAGING
        }
      })
    ])
    .then(([resCount, resOrder]: any) => {
      setOBJECT(resCount.data.result || Admin);
      setOBJECT_ORDER(resOrder.data.result.length > 0 ? resOrder.data.result : [Order]);
      setORDER_COUNT((prev: any) => ({
        ...prev,
        totalCnt: resOrder.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, ORDER_PAGING, DATE?.today]);

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              관리자 대시보드
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 1. date
    const dateSection = () => (
      <PickerDay
        OBJECT={DATE}
        setOBJECT={setDATE}
        extra={"today"}
        variant={"outlined"}
        i={0}
      />
    );
    // 2. visit
    const visitSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              방문자 수
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-6rem fw-600 black me-5"}>
              {OBJECT?.admin_visit_count || 0}
            </Div>
            <Div className={"fs-1-3rem fw-500 grey ms-10"}>
              명
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. order
    const orderSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              주문 내역
            </Div>
          </Grid>
          <Grid size={3}>
            <Div className={"fs-0-8rem fw-500"}>
              유형
            </Div>
          </Grid>
          <Grid size={6}>
            <Div className={"fs-0-8rem fw-500"}>
              금액
            </Div>
          </Grid>
          <Grid size={3}>
            <Div className={"fs-0-8rem fw-500"}>
              이름
            </Div>
          </Grid>
        </Grid>
        <Hr px={40} className={"bg-burgundy"} />
        {OBJECT_ORDER?.map((item: any, index: number) => (
          <Grid container spacing={2} columns={12} key={index}>
            <Grid size={3}>
              <Div className={"fs-0-8rem"}>
                {item?.order_category === "reservation" ? "매장 예약" : "제품 구매"}
              </Div>
            </Grid>
            <Grid size={6}>
              <Div max={15} className={"fs-1-0rem pointer-burgundy"}>
                {`${numeral(item?.order_total_price).format("0,0")}`}
              </Div>
            </Grid>
            <Grid size={3}>
              <Div className={"fs-0-8rem"}>
                {item?.order_name}
              </Div>
            </Grid>
            <Hr px={1} className={"bg-light-grey mb-20"} />
          </Grid>
        ))}
      </Card>
    );
    // 3. filter
    const filterSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={3} className={"d-center"}>
            <Select
              label={"정렬"}
              value={ORDER_PAGING?.sort}
              inputclass={"h-min0 h-4vh"}
              onChange={(e: any) => (
                setORDER_PAGING((prev: any) => ({
                  ...prev,
                  sort: e.target.value
                }))
              )}
            >
              {["asc", "desc"]?.map((item: string) => (
                <MenuItem
                  key={item}
                  value={item}
                  selected={ORDER_PAGING?.sort === item}
                  onChange={(e: any) => (
                    setORDER_PAGING((prev: any) => ({
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
          <Grid size={9} className={"d-center"}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={ORDER_COUNT.totalCnt}
              page={ORDER_PAGING.page}
              showFirstButton={true}
              showLastButton={true}
              onPageChange={(_event, newPage) => {
                setORDER_PAGING((prev: any) => ({
                  ...prev,
                  page: newPage
                }));
              }}
              onRowsPerPageChange={(event) => {
                setORDER_PAGING((prev: any) => ({
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
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {dateSection()}
            <Br px={30} />
            {visitSection()}
            <Br px={30} />
            {orderSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {filterSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : detailNode()}
    </>
  );
};
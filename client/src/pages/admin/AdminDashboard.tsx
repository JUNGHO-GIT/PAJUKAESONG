// AdminDashboard.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Admin, Order } from "@imports/ImportSchemas";
import { Div, Hr, Br } from "@imports/ImportComponents";
import { PickerDay, Select } from "@imports/ImportContainers";
import { Paper, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AdminDashboard = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { ALERT, setALERT } = useAlertStore();

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
    today: getDayFmt(),
  });

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
  }, [URL, SUBFIX, ORDER_PAGING, DATE?.today]);

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
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
    const visitSection = () => {
      const titleFragment = () => (
        <Grid container spacing={0} columns={12} className={"p-10"}>
          <Grid size={12} className={"d-col-center"}>
            <Div className={"fs-1-6rem fw-700"}>
              방문자 수
            </Div>
          </Grid>
        </Grid>
      );
      const visitFragment = (item: any) => (
        <Grid container spacing={0} columns={12} className={"p-10"}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-6rem fw-600 black me-5"}>
              {item?.admin_visit_count || 0}
            </Div>
            <Div className={"fs-1-3rem fw-500 grey ms-10"}>
              명
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-1 radius-1 shadow-1"}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} key={`list-${0}`}>
            {titleFragment()}
            {visitFragment(OBJECT)}
          </Grid>
        </Grid>
      );
    };
    // 3. list
    const orderSection = () => {
      const titleFragment = () => (
        <Grid container spacing={2} columns={12} className={"p-20"}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              주문 내역
            </Div>
          </Grid>
        </Grid>
      );
      const headerFragment = () => (
        <Grid container spacing={2} columns={12} className={"p-20 border-bottom-1-burgundy"}>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              유형
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              금액
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              이름
            </Div>
          </Grid>
        </Grid>
      );
      const listFragment = (item: any) => (
        <Grid container spacing={2} columns={12} className={"p-20"}>
          <Grid size={3}>
            <Div className={"fs-0-7rem"}>
              {item?.order_category === "reservation" && "매장 예약"}
              {item?.order_category === "buy" && "제품 구매"}
            </Div>
          </Grid>
          <Grid size={6}>
            <Div className={"fs-1-0rem pointer-burgundy"} max={10}>
              {numeral(item?.order_total_price).format("0,0")}
            </Div>
          </Grid>
          <Grid size={3}>
            <Div className={"fs-0-7rem"}>
              {item?.order_name}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-1 radius-1 shadow-1"}>
          {OBJECT_ORDER.map((item: any, i: number) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} key={`list-${i}`}>
              {i === 0 && titleFragment()}
              {i === 0 && headerFragment()}
              {listFragment(item)}
            </Grid>
          ))}
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={3} className={"d-col-center"}>
          <Select
            value={ORDER_PAGING?.sort}
            inputclass={"h-min0 h-5vh"}
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
        <Grid size={9} className={"d-col-center"}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={ORDER_COUNT.totalCnt}
            page={ORDER_PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1 p-2"}
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
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {dateSection()}
            <Br px={30} />
            {LOADING ? <Loading /> : visitSection()}
            <Br px={30} />
            {orderSection()}
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
      {detailNode()}
    </>
  );
};
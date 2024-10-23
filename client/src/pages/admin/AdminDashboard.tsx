// AdminDashboard.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
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
  const [visitCount, setVisitCount] = useState<any>(0);
  const [OBJECT_ORDER, setOBJECT_ORDER] = useState<any>([Order]);
  const [PAGING_ORDER, setPAGING_ORDER] = useState<any>({
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
          DATE: DATE?.today
        }
      }),
      axios.get(`${URL}${SUBFIX}/orderList`, {
        params: {
          DATE: DATE?.today,
          PAGING: PAGING_ORDER
        }
      })
    ])
    .then(([resCount, resOrder]: any) => {
      setVisitCount(resCount.data.result?.admin_visit_count || 0);
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
  }, [URL, SUBFIX, PAGING_ORDER, DATE?.today]);

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. date
    const dateSection = () => {
      const titleFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <Div className={"fs-1-4rem fw-700"}>
              날짜
            </Div>
          </Grid>
        </Grid>
      );
      const pickerFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <PickerDay
              OBJECT={DATE}
              setOBJECT={setDATE}
              extra={"today"}
              variant={"outlined"}
              i={0}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`date-${0}`}>
            {titleFragment()}
            <Br px={30} />
            {pickerFragment()}
          </Grid>
        </Grid>
      );
    };
    // 2. visit
    const visitSection = () => {
      const titleFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <Div className={"fs-1-4rem fw-700"}>
              방문자 수
            </Div>
          </Grid>
        </Grid>
      );
      const visitFragment = () => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-6rem fw-600 black me-5"}>
              {visitCount}
            </Div>
            <Div className={"fs-1-3rem fw-500 grey ms-10"}>
              명
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`visit-${0}`}>
            {titleFragment()}
            <Br px={30} />
            {visitFragment()}
          </Grid>
        </Grid>
      );
    };
    // 3. list
    const orderSection = () => {
      const titleFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Div className={"fs-1-4rem fw-700"}>
              주문 내역
            </Div>
          </Grid>
        </Grid>
      );
      const headFragment = () => (
        <Grid container spacing={2} columns={12}>
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
              주문자
            </Div>
          </Grid>
        </Grid>
      );
      const listFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={3}>
            <Div className={"fs-0-7rem"}>
              {item?.order_category === "reservation" && "매장 예약"}
              {item?.order_category === "buy" && "상품 구매"}
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
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          {OBJECT_ORDER.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`order-${i}`}>
              {i === 0 && (
                <>
                  {titleFragment()}
                  <Br px={30} />
                  {headFragment()}
                  <Hr px={40} className={"bg-burgundy"} />
                </>
              )}
              {listFragment(item)}
              {i < OBJECT_ORDER.length - 1 && (
                <>
                  <Hr px={40} className={"bg-light-grey"} />
                </>
              )}
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
            value={PAGING_ORDER?.sort}
            inputclass={"h-min0 h-5vh"}
            onChange={(e: any) => (
              setPAGING_ORDER((prev: any) => ({
                ...prev,
                sort: e.target.value
              }))
            )}
          >
            {["asc", "desc"]?.map((item: string) => (
              <MenuItem
                key={item}
                value={item}
                selected={PAGING_ORDER?.sort === item}
                onChange={(e: any) => (
                  setPAGING_ORDER((prev: any) => ({
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
            page={PAGING_ORDER.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1 p-2"}
            onPageChange={(_event, newPage) => {
              setPAGING_ORDER((prev: any) => ({
                ...prev,
                page: newPage
              }));
            }}
            onRowsPerPageChange={(event) => {
              setPAGING_ORDER((prev: any) => ({
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
// OrderList.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate } from "@importHooks";
import { useStoreAlert, useResponsive } from "@importHooks";
import { axios } from "@importLibs";
import { insertComma } from "@importScripts";
import { Order } from "@importSchemas";
import { Loader, Filter } from "@importLayouts";
import { Div, Hr } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const OrderList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location, } = useCommonValue();
  const { getDayNotFmt } = useCommonDate();
  const { paperClass } = useResponsive();
  const { ALERT, setALERT } = useStoreAlert();

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
        order_phone: location.state?.order_phone || "",
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
      setALERT({
        open: !ALERT.open,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    })
    .finally(() => {
      setTimeout(() => {
        setLOADING(false);
      }, 100);
    });
  }, [URL, SUBFIX, PAGING]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 2. list
    const listSection = () => {
      const headFragment = () => (
        <Grid container={true} spacing={2}>
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
              날짜
            </Div>
          </Grid>
        </Grid>
      );
      const listFragment = () => (
        <Grid container={true} spacing={2}>
          {OBJECT.filter((f: any) => f._id).map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`list-${i}`}>
              <Grid container={true} spacing={2}>
                <Grid size={3}>
                  <Div className={"fs-0-7rem"}>
                    {item?.order_category === "reservation" && "매장 예약"}
                    {item?.order_category === "buy" && "상품 구매"}
                  </Div>
                </Grid>
                <Grid size={6}>
                  <Div className={"fs-1-0rem pointer-burgundy"} max={10} onClick={() => {
                    navigate('/order/detail', {
                      state: {
                        _id: item?._id
                      },
                    });
                  }}>
                    {insertComma(item?.order_total_price || "0")}
                  </Div>
                </Grid>
                <Grid size={3}>
                  <Div className={"fs-0-7rem"}>
                    {getDayNotFmt(item?.order_regDt).format("MM-DD")}
                  </Div>
                </Grid>
                {i < OBJECT.length - 1 && (
                  <Hr px={20} className={"bg-light-grey"} />
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-1 shadow-1 p-20"}>
          {headFragment()}
          <Hr px={40} className={"bg-burgundy"} />
          {listFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={PAGING}
        setPAGING={setPAGING}
        COUNT={COUNT}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass}`}>
        {LOADING ? <Loader /> : (
          <>
            {listSection()}
            <Hr px={40} className={"bg-grey"} />
            {filterSection()}
          </>
        )}
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
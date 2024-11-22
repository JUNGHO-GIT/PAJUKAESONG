// AdminDashboard.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate } from "@importHooks";
import { useStoreAlert, useResponsive } from "@importHooks";
import { axios } from "@importLibs";
import { insertComma } from "@importScripts";
import { Order, Contact } from "@importSchemas";
import { Loader, Filter } from "@importLayouts";
import { PickerDay } from "@importContainers";
import { Div, Hr, Br } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const AdminDashboard = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate } = useCommonValue();
  const { getDayFmt, getDayNotFmt } = useCommonDate();
  const { paperClass } = useResponsive();
  const { ALERT, setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [visitCount, setVisitCount] = useState<any>(0);
  const [OBJECT_CONTACT, setOBJECT_CONTACT] = useState<any>([Contact]);
  const [OBJECT_ORDER, setOBJECT_ORDER] = useState<any>([Order]);
  const [PAGING_CONTACT, setPAGING_CONTACT] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [PAGING_ORDER, setPAGING_ORDER] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [CONTACT_COUNT, setCONTACT_COUNT] = useState<any>({
    totalCnt: 0,
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
      axios.get(`${URL}${SUBFIX}/contactList`, {
        params: {
          DATE: DATE?.today,
          PAGING: PAGING_CONTACT
        }
      }),
      axios.get(`${URL}${SUBFIX}/orderList`, {
        params: {
          DATE: DATE?.today,
          PAGING: PAGING_ORDER
        }
      })
    ])
    .then(([resCount, resContact, resOrder]) => {
      setVisitCount(resCount.data.result?.admin_visit_count || 0);
      setOBJECT_CONTACT(resContact.data.result.length > 0 ? resContact.data.result : [Contact]);
      setOBJECT_ORDER(resOrder.data.result.length > 0 ? resOrder.data.result : [Order]);
      setCONTACT_COUNT((prev: any) => ({
        ...prev,
        totalCnt: resContact.data.totalCnt || 0,
      }));
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
      setTimeout(() => {
        setLOADING(false);
      }, 100);
    });
  }, [URL, SUBFIX, DATE, PAGING_CONTACT, PAGING_ORDER]);

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. date
    const dateSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-col-center"}>
            <Div className={"fs-1-4rem fw-700"}>
              날짜
            </Div>
          </Grid>
        </Grid>
      );
      const pickerFragment = () => (
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-col-center"}>
            <PickerDay
              OBJECT={DATE}
              setOBJECT={setDATE}
              extra={"today"}
              i={0}
            />
          </Grid>
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20"}>
          {titleFragment()}
          <Br m={30} />
          {pickerFragment()}
        </Card>
      );
    };
    // 2. visit
    const visitSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-col-center"}>
            <Div className={"fs-1-4rem fw-700"}>
              방문자 수
            </Div>
          </Grid>
        </Grid>
      );
      const visitFragment = () => (
        <Grid container={true} spacing={0}>
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
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20"}>
          {titleFragment()}
          <Br m={30} />
          {visitFragment()}
        </Card>
      );
    };
    // 3. order
    const orderSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Div className={"fs-1-4rem fw-700"}>
              주문 내역
            </Div>
          </Grid>
        </Grid>
      );
      const headFragment = () => (
        <Grid container={true} spacing={2}>
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
      const listFragment = () => (
        <Grid container={true} spacing={0}>
          {OBJECT_ORDER.filter((filter: any) => !!filter._id).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`order-${i}`}>
              <Grid container={true} spacing={0}>
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
                    {item?.order_name}
                  </Div>
                </Grid>
                {i < OBJECT_ORDER.length - 1 ? (
                  <Hr m={40} className={"bg-light"} />
                ) : (
                  <Br m={10} />
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20"}>
          {titleFragment()}
          <Br m={30} />
          {headFragment()}
          <Hr m={40} className={"bg-burgundy h-2"} />
          {listFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterOrderSection = () => (
      <Filter
        OBJECT={OBJECT_ORDER}
        PAGING={PAGING_ORDER}
        setPAGING={setPAGING_ORDER}
        COUNT={ORDER_COUNT}
        extra={"order"}
      />
    );
    // 4. contact
    const contactSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Div className={"fs-1-4rem fw-700"}>
              문의 내역
            </Div>
          </Grid>
        </Grid>
      );
      const headFragment = () => (
        <Grid container={true} spacing={2}>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              유형
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              날짜
            </Div>
          </Grid>
        </Grid>
      );
      const listFragment = () => (
        <Grid container={true} spacing={0}>
          {OBJECT_CONTACT.filter((filter: any) => !!filter._id).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`contact-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={3}>
                  <Div className={"fs-0-7rem"}>
                    {item?.contact_category === "franchise" && "가맹 문의"}
                    {item?.contact_category === "personal" && "1:1 문의"}
                  </Div>
                </Grid>
                <Grid size={6}>
                  <Div className={"fs-1-0rem pointer-burgundy"} max={10} onClick={() => {
                    navigate('/contact/detail', {
                      state: {
                        _id: item?._id
                      },
                    });
                  }}>
                    {item?.contact_title}
                  </Div>
                </Grid>
                <Grid size={3}>
                  <Div className={"fs-0-7rem"}>
                    {getDayNotFmt(item?.contact_regDt).format("MM-DD")}
                  </Div>
                </Grid>
                {i < OBJECT_CONTACT.length - 1 ? (
                  <Hr m={40} className={"bg-light"} />
                ) : (
                  <Br m={10} />
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20"}>
          {titleFragment()}
          <Br m={30} />
          {headFragment()}
          <Hr m={40} className={"bg-burgundy h-2"} />
          {listFragment()}
        </Card>
      );
    };
    // 4. filter
    const filterContactSection = () => (
      <Filter
        OBJECT={OBJECT_CONTACT}
        PAGING={PAGING_CONTACT}
        setPAGING={setPAGING_CONTACT}
        COUNT={CONTACT_COUNT}
        extra={"contact"}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass}`}>
        {LOADING ? <Loader /> : (
          <>
            {dateSection()}
            <Br m={30} />
            {visitSection()}
            <Br m={30} />
            {orderSection()}
            <Br m={30} />
            {filterOrderSection()}
            <Br m={30} />
            {contactSection()}
            <Br m={30} />
            {filterContactSection()}
          </>
        )}
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
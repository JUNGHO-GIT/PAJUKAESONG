// OrderDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios, insertComma, setSession } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Div, Hr, Br, Img, Icons } from "@imports/ImportComponents";
import { Input } from "@imports/ImportContainers";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();
  const { validate } = useValidateOrder();

  // 1. common -------------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Order);
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
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "delete")) {
      setLOADING(false);
      return;
    }
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: OBJECT?._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
        document?.querySelector("input[type=file]")?.remove();
        setSession("order_product", "", "", []);
        navigate('/order/list', {
          state: {
            order_name: OBJECT?.order_name,
            order_phone: OBJECT?.order_phone,
          },
        });
      }
      else {
        setALERT({
          open: !ALERT.open,
          severity: "error",
          msg: res.data.msg,
        });
      }
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
  };

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 2. product
    const productSection = () => {
      const productFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={3} className={"d-col-center"}>
            <Img
              max={isXxs ? 80 : 120}
              hover={false}
              shadow={true}
              radius={false}
              group={"product"}
              src={item.product_images && item.product_images[0]}
            />
          </Grid>
          <Grid size={4} className={"d-col-center"}>
            <Div className={"d-row-center"}>
              <Div className={"fs-1-2rem fw-600 ms-5"}>
                {item?.product_name}
              </Div>
            </Div>
            <Div className={"d-row-center"}>
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15 h-15 dark"}
              />
              <Div className={"fs-1-0rem ms-n5"}>
                {insertComma(item?.product_price || "0")}
              </Div>
            </Div>
          </Grid>
          <Grid size={5} className={"d-col-center"}>
            <Div className={"d-row-center border-1"}>
              <Icons
                key={"Minus"}
                name={"Minus"}
                className={"w-12 h-12 black"}
              />
              <Div className={"fs-0-7rem"}>
                {item?.product_count}
              </Div>
              <Icons
                key={"Plus"}
                name={"Plus"}
                className={"w-12 h-12 black"}
              />
            </Div>
          </Grid>
        </Grid>
      );
      const priceFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-0rem"}>
              총 금액  :
            </Div>
            <Icons
              key={"Won"}
              name={"Won"}
              className={"w-15 h-15 dark"}
            />
            <Div className={"fs-1-2rem fw-600"}>
              {insertComma(item?.order_price || "0")}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          {OBJECT?.order_product?.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`product-${i}`}>
              {productFragment(item)}
              {i < OBJECT?.order_product?.length - 1 ? (
                <>
                  <Hr px={40} className={"bg-light-grey"} />
                </>
              ) : (
                <>
                  <Hr px={40} className={"bg-burgundy"} />
                  {priceFragment(OBJECT)}
                </>
              )}
            </Grid>
          ))}
        </Grid>
      );
    };
    // 3. order
    const orderSection = () => {
      const orderFragment = (item: any) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Input
              label={"주문 유형"}
              disabled={true}
              value={item?.order_category === "reservation" ? "매장 예약" : "상품 구매"}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"이름"}
              disabled={true}
              value={item?.order_name ?? ""}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"이메일"}
              disabled={true}
              value={item?.order_email ?? ""}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"전화번호"}
              disabled={true}
              value={item?.order_phone ?? ""}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"인원"}
              disabled={true}
              value={item?.order_headcount ?? ""}
            />
          </Grid>
          <Grid size={12}>
            <Input
              disabled={true}
              label={"주문 날짜"}
              value={getDayFmt(item?.order_date ?? "")}
            />
          </Grid>
          <Grid size={12}>
            <Input
              disabled={true}
              label={"예약 시간"}
              value={item?.order_time ?? ""}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`order-${0}`}>
            {orderFragment(OBJECT)}
          </Grid>
        </Grid>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={6} className={"d-row-left"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy"}
            onClick={() => {
              navigate("/order/list", {
                state: {
                  order_name: OBJECT?.order_name,
                  order_phone: OBJECT?.order_phone
                }
              });
            }}
          >
            목록으로
          </Div>
        </Grid>
        <Grid size={6} className={"d-row-right"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
            onClick={() => {
              navigate("/order/update", {
                state: {
                  _id: OBJECT?._id
                }
              });
            }}
          >
            수정
          </Div>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy ms-10"}
            onClick={() => {
              flowDelete();
            }}
          >
            삭제
          </Div>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : productSection()}
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
      {saveNode()}
    </>
  );
};
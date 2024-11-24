// OrderDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate, useResponsive, useValidateOrder } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios } from "@importLibs";
import { insertComma, setSession } from "@importScripts";
import { Order } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input } from "@importContainers";
import { Div, Hr, Br, Img, Icons } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const OrderDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { xxs, paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();
  const { validate } = useValidateOrder();

  // 1. common -------------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Order);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
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
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "delete")) {
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
          open: true,
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
          open: true,
          severity: "error",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  };

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 2. product
    const productSection = () => {
      const productFragment = () => (
        <Grid container={true} spacing={2}>
          {OBJECT?.order_product?.map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`product-${i}`}>
              <Grid size={3} className={"d-col-center"}>
                <Img
                  max={xxs ? 80 : 120}
                  hover={false}
                  shadow={true}
                  radius={false}
                  group={"product"}
                  src={item.product_images[0]}
                />
              </Grid>
              <Grid size={4} className={"d-col-center"}>
                <Div className={"d-row-center"}>
                  <Div className={"fs-1-2rem fw-600 ml-5px"}>
                    {item?.product_name}
                  </Div>
                </Div>
                <Div className={"d-row-center"}>
                  <Icons
                    key={"Won"}
                    name={"Won"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-1-0rem ml-n5"}>
                    {insertComma(item?.product_price || "0")}
                  </Div>
                </Div>
              </Grid>
              <Grid size={5} className={"d-col-center"}>
                <Div className={"d-row-center border-1"}>
                  <Icons
                    key={"Minus"}
                    name={"Minus"}
                    className={"w-12px h-12px black"}
                  />
                  <Div className={"fs-0-7rem"}>
                    {item?.product_count}
                  </Div>
                  <Icons
                    key={"Plus"}
                    name={"Plus"}
                    className={"w-12px h-12px black"}
                  />
                </Div>
              </Grid>
              {i < OBJECT?.order_product?.length - 1 && (
                <Hr m={20} className={"bg-light-grey"} />
              )}
            </Grid>
          ))}
        </Grid>
      );
      const priceFragment = (item: any) => (
        <Grid container={true} spacing={2}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-0rem"}>
              총 금액  :
            </Div>
            <Icons
              key={"Won"}
              name={"Won"}
              className={"w-15px h-15px dark"}
            />
            <Div className={"fs-1-2rem fw-600"}>
              {insertComma(item?.order_price || "0")}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {productFragment()}
          <Hr m={40} className={"bg-burgundy h-2px"} />
          {priceFragment(OBJECT)}
        </Card>
      );
    };
    // 3. order
    const orderSection = () => {
      const orderFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={3} key={`order-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"mt-10"}>
                  <Input
                    label={"주문 유형"}
                    disabled={true}
                    value={item?.order_category === "reservation" ? "매장 예약" : "상품 구매"}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"이름"}
                    disabled={true}
                    value={item?.order_name || ""}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"이메일"}
                    disabled={true}
                    value={item?.order_email || ""}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"전화번호"}
                    disabled={true}
                    value={item?.order_phone || ""}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"인원"}
                    disabled={true}
                    value={item?.order_headcount || ""}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    disabled={true}
                    label={"주문 날짜"}
                    value={getDayFmt(item?.order_date || "")}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    disabled={true}
                    label={"예약 시간"}
                    value={item?.order_time || ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {orderFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={null}
        setPAGING={null}
        COUNT={null}
        flow={{
          flowDelete
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {productSection()}
        <Br m={30} />
        {orderSection()}
        <Hr m={60} className={"bg-light h-5px"} />
        {filterSection()}
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
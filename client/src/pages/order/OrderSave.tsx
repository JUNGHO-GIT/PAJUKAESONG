// OrderSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Input, Select, PickerDay, PickerTime } from "@imports/ImportContainers";
import { Div, Hr, Br, Btn, Img, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, TITLE, PATH } = useCommonValue();
  const { isXxs } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateOrder();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);

  useEffect(() => {
    console.log("===================================");
    console.log("OBJECT", JSON.stringify(OBJECT, null, 2));
  }, [OBJECT]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    const existOrderProduct = sessionStorage.getItem(`${TITLE}_order_product`);
    if (existOrderProduct) {
      setOBJECT((prev: any) => ({
        ...prev,
        order_product: JSON.parse(existOrderProduct),
      }));
    }
    setLOADING(false);
  }, [PATH]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const updatedOrderProduct = OBJECT?.order_product;
    sessionStorage.setItem(`${TITLE}_order_product`, JSON.stringify(updatedOrderProduct));
    setOBJECT((prev: any) => ({
      ...prev,
      order_total_price: String(
        OBJECT?.order_product?.reduce((acc: number, cur: any) => (
          acc + Number(cur.product_price)
        ), 0)
      ),
    }));
  }, [OBJECT?.order_product]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "save")) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/save`, {
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
        document?.querySelector("input[type=file]")?.remove();
        sessionStorage?.removeItem(`${TITLE}_order_product`);
        navigate("/order/find");
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
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
            <Div className={"fs-2-0rem fw-700"}>
              주문 하기
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. product
    const productSection = () => {
      const productFragment = (item: any, i: number) => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={3} className={"d-column-center"}>
              <Img
                max={isXxs ? 50 : 60}
                hover={false}
                shadow={true}
                radius={true}
                group={"product"}
                src={item.product_images && item.product_images[0]}
              />
            </Grid>
            <Grid size={4} className={"d-column-left"}>
              <Div className={"d-row-center"}>
                <Div className={"fs-1-4rem fw-600 ms-5"}>
                  {item?.product_name}
                </Div>
              </Div>
              <Br px={5} />
              <Div className={"d-row-center"}>
                <Icons
                  key={"Won"}
                  name={"Won"}
                  className={"w-15 h-15 dark"}
                />
                <Div className={"fs-1-0rem ms-n5"}>
                  {numeral(item?.product_price).format("0,0")}
                </Div>
              </Div>
            </Grid>
            <Grid size={4} className={"d-column-center"}>
              <Div className={"d-row-center border-1"}>
                <Icons
                  key={"Minus"}
                  name={"Minus"}
                  className={"w-12 h-12 black"}
                  onClick={() => {
                    const value = item?.product_count;
                    const newValue = value < 1 ? 1 : value - 1;
                    const originalPrice = Number(item?.product_price) / value;
                    if (newValue <= 1) {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        order_product: prev.order_product.map((product: any, idx: number) => (
                          idx === i ? {
                            ...product,
                            product_count: 1,
                            product_price: originalPrice,
                          } : (
                            product
                          )
                        )),
                      }));
                    }
                    else if (!isNaN(newValue) && newValue <= 30) {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        order_product: prev.order_product.map((product: any, idx: number) => (
                          idx === i ? {
                            ...product,
                            product_count: newValue,
                            product_price: originalPrice * newValue,
                          } : (
                            product
                          )
                        )),
                      }));
                    }
                  }}
                />
                <Div className={"fs-0-7rem"}>
                  {item?.product_count}
                </Div>
                <Icons
                  key={"Plus"}
                  name={"Plus"}
                  className={"w-12 h-12 black"}
                  onClick={() => {
                    const value = item?.product_count;
                    const newValue = value < 1 ? 1 : value + 1;
                    const originalPrice = Number(item?.product_price) / value;
                    if (newValue <= 1) {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        order_product: prev.order_product.map((product: any, idx: number) => (
                          idx === i ? {
                            ...product,
                            product_count: 1,
                            product_price: originalPrice,
                          } : (
                            product
                          )
                        )),
                      }));
                    }
                    else if (!isNaN(newValue) && newValue <= 30) {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        order_product: prev.order_product.map((product: any, idx: number) => (
                          idx === i ? {
                            ...product,
                            product_count: newValue,
                            product_price: originalPrice * newValue,
                          } : (
                            product
                          )
                        )),
                      }));
                    }
                  }}
                />
              </Div>
            </Grid>
            <Grid size={1} className={"d-column-center"}>
              <Icons
                key={"X"}
                name={"X"}
                className={"w-16 h-16 black"}
                onClick={() => {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    order_product: [
                      ...prev.order_product.slice(0, i),
                      ...prev.order_product.slice(i + 1),
                    ],
                  }));
                }}
              />
            </Grid>
            {/** 마지막 항목 제외 hr 추가 */}
            <Grid size={12}>
              {i !== OBJECT?.order_product?.length - 1 && (
                <Hr px={40} className={"bg-light-grey"} />
              )}
            </Grid>
          </Grid>
        </Card>
      );
      const priceFragment = (item: any) => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12} className={"d-row-center"}>
              <Div className={"fs-1-0rem me-10"}>
                총 금액  :
              </Div>
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15 h-15 dark"}
              />
              <Div className={"fs-1-2rem fw-600"}>
                {numeral(item?.order_total_price).format("0,0")}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"border-1 radius-1 shadow-1 p-20"}>
          <Grid container spacing={0} columns={12}>
            {OBJECT?.order_product?.map((item: any, i: number) => (
              <Grid
                size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                className={"d-column-center"}
                key={`product-${i}`}
              >
                {productFragment(item, i)}
              </Grid>
            ))}
            <Grid size={12}>
              <Hr px={40} className={"bg-burgundy"} />
              {priceFragment(OBJECT)}
            </Grid>
          </Grid>
        </Card>
      );
    };
    // 3. order
    const orderSection = () => {
      const orderFragment = (item: any, i: number) => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Select
                variant={"outlined"}
                label={"주문 유형"}
                required={true}
                value={item?.order_category}
                inputRef={REFS?.[i]?.order_category}
                error={ERRORS?.[i]?.order_category}
                onChange={(e: any) => {
                  const value = e.target.value;
                  setOBJECT((prev: any) => ({
                    ...prev,
                    order_category: value,
                  }));
                }}
              >
                {["reservation", "buy"].map((category: string, idx: number) => (
                  <MenuItem key={idx} value={category} className={"fs-0-8rem"}>
                    {category === "reservation" && "매장 예약"}
                    {category === "buy" && "제품 구매"}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"이름"}
                required={true}
                value={item?.order_name}
                inputRef={REFS?.[i]?.order_name}
                error={ERRORS?.[i]?.order_name}
                onChange={(e: any) => {
                  const value = e.target.value;
                  setOBJECT((prev: any) => ({
                    ...prev,
                    order_name: value,
                  }));
                }}
              />
            </Grid>
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"이메일"}
                required={true}
                value={item?.order_email}
                inputRef={REFS?.[i]?.order_email}
                error={ERRORS?.[i]?.order_email}
                placeholder={"abcd@naver.com"}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (value.length > 30) {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      order_email: prev.order_email,
                    }));
                  }
                  else {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      order_email: value,
                    }));
                  }
                }}
              />
            </Grid>
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"전화번호"}
                required={true}
                value={item?.order_phone}
                inputRef={REFS?.[i]?.order_phone}
                error={ERRORS?.[i]?.order_phone}
                placeholder={"010-1234-5678"}
                onChange={(e: any) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  const newValue = value.replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3');
                  if (value.length > 11) {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      order_phone: prev.order_phone,
                    }));
                  }
                  else {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      order_phone: newValue,
                    }));
                  }
                }}
              />
            </Grid>
            <Grid size={12}>
              <Select
                variant={"outlined"}
                required={true}
                label={"인원"}
                value={item?.order_headcount}
                inputRef={REFS?.[i]?.order_headcount}
                error={ERRORS?.[i]?.order_headcount}
                onChange={(e: any) => {
                  const value = e.target.value;
                  setOBJECT((prev: any) => ({
                    ...prev,
                    order_headcount: value,
                  }));
                }}
              >
                {Array.from({ length: 30 }, (_, i) => i).map((seq: number, idx: number) => (
                  <MenuItem key={idx} value={seq} className={"fs-0-8rem"}>
                    {seq}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={12}>
              <PickerDay
                OBJECT={OBJECT}
                setOBJECT={setOBJECT}
                REFS={REFS}
                ERRORS={ERRORS}
                extra={"order_date"}
                i={i}
              />
            </Grid>
            <Grid size={12}>
              <PickerTime
                OBJECT={OBJECT}
                setOBJECT={setOBJECT}
                REFS={REFS}
                ERRORS={ERRORS}
                extra={"order_time"}
                i={i}
              />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Card className={"border-1 radius-1 shadow-1 p-20"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              className={"d-column-center"}
              key={`order-${0}`}
            >
              {orderFragment(OBJECT, 0)}
            </Grid>
          </Grid>
        </Card>
      );
    };
    // 4. btn
    const btnSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={6} className={"d-row-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-grey"}
              onClick={() => {
                navigate("/product/list");
              }}
            >
              더 찾기
            </Btn>
          </Grid>
          <Grid size={6} className={"d-row-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave();
              }}
            >
              주문하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {LOADING ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                {titleSection()}
                <Br px={30} />
                {productSection()}
                <Br px={30} />
                {orderSection()}
                <Br px={30} />
                {btnSection()}
              </>
            )}
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
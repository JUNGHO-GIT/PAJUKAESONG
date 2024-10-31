// OrderSave.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive } from "@importHooks";
import { useStoreAlert, useValidateOrder } from "@importHooks";
import { axios } from "@importLibs";
import { insertComma, getSession, setSession } from "@importScripts";
import { Order, Product } from "@importSchemas";
import { Loader } from "@importLayouts";
import { Input, Select, PickerDay, PickerTime } from "@importContainers";
import { Div, Hr, Br, Btn, Img, Icons } from "@importComponents";
import { Paper, Grid, Card, MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const OrderSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { isXxs, paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateOrder();
  const { ALERT, setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);
  const [PRODUCT, setPRODUCT] = useState<any>([Product]);

  useEffect(() => {
    console.log("===================================");
    console.log("OBJECT", JSON.stringify(OBJECT, null, 2));
  }, [OBJECT]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 초기 로딩 시 세션에서 데이터 불러오기
  useEffect(() => {
    setLOADING(true);

    const existOrderProduct = getSession("order_product", "", "");

    // 세션에 데이터가 있으면 불러오기
    if (existOrderProduct && existOrderProduct.length > 0) {
      setPRODUCT(existOrderProduct);
      setOBJECT((prev: any) => ({
        ...prev,
        order_product: existOrderProduct,
      }));
    }

    setLOADING(false);
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // PRODUCT 변경 시 세션 저장 및 총 가격 계산
  useEffect(() => {
    const totalPrice = PRODUCT.reduce((acc: number, cur: any) => (
      acc + Number(cur.product_price)
    ), 0);

    setOBJECT((prev: any) => ({
      ...prev,
      order_total_price: String(totalPrice),
      order_product: PRODUCT,
    }));

    // 세션에 저장
    setSession("order_product", "", "", PRODUCT);

  }, [PRODUCT]);

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
        setSession("order_product", "", "", []);
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
      setTimeout(() => {
        setLOADING(false);
      }, 300);
    });
  };

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 2. product
    const productSection = () => {
      const productFragment = () => (
        <Grid container={true} spacing={2}>
          {OBJECT?.order_product?.filter((f: any) => f._id).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`product-${i}`}>
              <Grid size={3} className={"d-col-center"}>
                <Img
                  max={isXxs ? 80 : 120}
                  hover={false}
                  shadow={true}
                  radius={false}
                  group={"product"}
                  src={item.product_images[0]}
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
              <Grid size={4} className={"d-col-center"}>
                <Div className={"d-row-center border-1"}>
                  <Icons
                    key={"Minus"}
                    name={"Minus"}
                    className={"w-12 h-12 black"}
                    onClick={() => {
                      const value = Number(item?.product_count);
                      const newValue = value < 1 ? 1 : value - 1;
                      const originalPrice = Number(item?.product_price) / value;
                      if (newValue <= 1) {
                        setPRODUCT((prev: any) => [
                          ...prev.slice(0, i),
                          {
                            ...item,
                            product_count: "1",
                            product_price: String(originalPrice),
                          },
                          ...prev.slice(i + 1),
                        ]);
                      }
                      else if (!isNaN(newValue) && newValue <= 30) {
                        setPRODUCT((prev: any) => [
                          ...prev.slice(0, i),
                          {
                            ...item,
                            product_count: String(newValue),
                            product_price: String(originalPrice * newValue),
                          },
                          ...prev.slice(i + 1),
                        ]);
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
                      const value = Number(item?.product_count);
                      const newValue = value < 1 ? 1 : value + 1;
                      const originalPrice = Number(item?.product_price) / value;
                      if (newValue <= 1) {
                        setPRODUCT((prev: any) => [
                          ...prev.slice(0, i),
                          {
                            ...item,
                            product_count: "1",
                            product_price: String(originalPrice),
                          },
                          ...prev.slice(i + 1),
                        ]);
                      }
                      else if (!isNaN(newValue) && newValue <= 30) {
                        setPRODUCT((prev: any) => [
                          ...prev.slice(0, i),
                          {
                            ...item,
                            product_count: String(newValue),
                            product_price: String(originalPrice * newValue),
                          },
                          ...prev.slice(i + 1),
                        ]);
                      }
                    }}
                  />
                </Div>
              </Grid>
              <Grid size={1} className={"d-col-center"}>
                <Icons
                  key={"X"}
                  name={"X"}
                  className={"w-16 h-16 black"}
                  onClick={() => {
                    setPRODUCT((prev: any) => [
                      ...prev.slice(0, i),
                      ...prev.slice(i + 1),
                    ]);
                  }}
                />
              </Grid>
              <Grid size={12}>
                {i < OBJECT?.order_product?.length - 1 && (
                  <Hr px={20} className={"bg-light-grey"} />
                )}
              </Grid>
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
              className={"w-15 h-15 dark"}
            />
            <Div className={"fs-1-2rem fw-600"}>
              {insertComma(item?.order_total_price || "0")}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-1 shadow-1 p-20"}>
          {productFragment()}
          <Hr px={40} className={"bg-burgundy"} />
          {priceFragment(OBJECT)}
        </Card>
      );
    };
    // 3. order
    const orderSection = () => {
      const orderFragment = (item: any, i: number) => (
        <Grid container={true} spacing={3} key={`order-${i}`}>
          <Grid size={12} className={"mt-10"}>
            <Select
              required={true}
              label={"주문 유형"}
              value={item?.order_category}
              inputRef={REFS?.[i]?.order_category}
              error={ERRORS?.[i]?.order_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_category: e.target.value,
                }));
              }}
            >
              {["reservation", "buy"].map((category: string, idx: number) => (
                <MenuItem
                  key={idx}
                  value={category}
                  className={"fs-0-8rem"}
                >
                  {category === "reservation" && "매장 예약"}
                  {category === "buy" && "상품 구매"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Input
              required={true}
              label={"이름"}
              value={item?.order_name}
              inputRef={REFS?.[i]?.order_name}
              error={ERRORS?.[i]?.order_name}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"이메일"}
              required={true}
              value={item?.order_email}
              inputRef={REFS?.[i]?.order_email}
              error={ERRORS?.[i]?.order_email}
              placeholder={"abcd@naver.com"}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value === "" ? "" : e.target.value;
                // 30자 제한
                if (value.length > 30) {
                  return;
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_email: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              label={"전화번호"}
              required={true}
              value={item?.order_phone}
              inputRef={REFS?.[i]?.order_phone}
              error={ERRORS?.[i]?.order_phone}
              placeholder={"010-1234-5678"}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value === "" ? "" : e.target.value.replace(/[^0-9]/g, "")
                // 11자 제한 + 정수
                if (value.length > 11 || !/^\d+$/.test(value)) {
                  return;
                }
                // 010-1234-5678 형식으로 변경
                if (7 <= value.length && value.length < 12) {
                  value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
                }
                else if (4 <= value.length && value.length < 7) {
                  value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                }
                else if (0 <= value.length && value.length < 4) {
                  value = value.replace(/(\d{0,3})/, "$1");
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_phone: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Select
              required={true}
              label={"인원"}
              value={item?.order_headcount}
              inputRef={REFS?.[i]?.order_headcount}
              error={ERRORS?.[i]?.order_headcount}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_headcount: e.target.value,
                }));
              }}
            >
              {Array.from({ length: 30 }, (_, i) => i).map((seq: number, idx: number) => (
                <MenuItem
                  key={idx}
                  value={seq}
                  className={"fs-0-8rem"}
                >
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
      );
      return (
        <Card className={"d-col-center border-1 radius-1 shadow-1 p-20"}>
          {orderFragment(OBJECT, 0)}
        </Card>
      );
    };
    // 4. btn
    const btnSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate("/product/list");
            }}
          >
            더 찾기
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowSave();
            }}
          >
            주문하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={paperClass}>
        {LOADING ? <Loader /> : (
          <>
            {productSection()}
            <Br px={30} />
            {orderSection()}
            <Br px={20} />
            {btnSection()}
          </>
        )}
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
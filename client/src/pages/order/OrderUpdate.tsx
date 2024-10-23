// OrderUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios, numeral, setSession } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order, Product } from "@imports/ImportSchemas";
import { Input, Select, PickerDay, PickerTime } from "@imports/ImportContainers";
import { Div, Hr, Br, Btn, Img, Icons } from "@imports/ImportComponents";
import { Paper, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, TITLE, location_id } = useCommonValue();
  const { isXxs } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateOrder();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);
  const [PRODUCT, setPRODUCT] = useState<any>([Product]);

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
      setPRODUCT(res.data.result?.order_product || [Product]);
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
    setSession("order_product", "", "", JSON.stringify(PRODUCT));

  }, [PRODUCT]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowUpdate = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "update")) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`, {
      _id: OBJECT?._id,
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
      setLOADING(false);
    });
  };

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 2. product
    const productSection = () => {
      const productFragment = (item: any, i: number) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={3} className={"d-col-center"}>
            <Img
              max={isXxs ? 50 : 60}
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
                {numeral(item?.product_price).format("0,0")}
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
              {numeral(item?.order_total_price).format("0,0")}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          {PRODUCT?.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`product-${i}`}>
              {productFragment(item, i)}
              {i < PRODUCT.length - 1 ? (
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
      const orderFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
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
                  {category === "buy" && "상품 구매"}
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
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`order-${0}`}>
            {orderFragment(OBJECT, 0)}
          </Grid>
        </Grid>
      );
    };
    // 4. btn
    const btnSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
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
              flowUpdate();
            }}
          >
            수정하기
          </Btn>
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
            <Br px={20} />
            {btnSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {updateNode()}
    </>
  );
};
// OrderUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios, numeral } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Div, Hr, Btn, Img, Icons } from "@imports/ImportComponents";
import { Input, Select, PickerDay, PickerTime } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, TITLE, PATH, location_id
  } = useCommonValue();
  const {
    dayFmt,
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateOrder();

  // 2-1. useState ---------------------------------------------------------------------------------
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
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, location_id]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    const existOrderProduct = sessionStorage.getItem(`${TITLE}_order_product`);
    if (existOrderProduct) {
      setOBJECT((prev: any) => ({
        ...prev,
        order_product: JSON.parse(existOrderProduct),
        order_date: dayFmt,
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
  const flowUpdate = () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`, {
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        document?.querySelector("input[type=file]")?.remove();
        sessionStorage?.removeItem(`${TITLE}_order_product`);
        navigate("/order/find");
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  };

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 1. title
    const titleSection = () => (
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        주문 수정
      </Div>
    );
    // 2. product
    const productSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius-1 p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          {OBJECT?.order_product?.map((item: any, index: number) => (
            item.product_name && (
              <Grid container spacing={2} columns={12} key={index}>
                <Grid size={3} className={"d-column-left"}>
                  <Img
                    max={70}
                    hover={false}
                    shadow={false}
                    radius={false}
                    group={"product"}
                    src={item?.product_images?.[0]}
                    className={"w-100p"}
                  />
                </Grid>
                <Grid size={4} className={"d-column-left"}>
                  <Div className={"d-row-center"}>
                    <Div className={"fs-1-4rem fw-600"}>
                      {item?.product_name}
                    </Div>
                  </Div>
                  <Div className={"d-row-center"}>
                    <Icons
                      key={"Won"}
                      name={"Won"}
                      className={"w-15 h-15 dark ms-n10"}
                    />
                    <Div className={"fs-1-0rem"}>
                      {numeral(item?.product_price).format("0,0")}
                    </Div>
                  </Div>
                </Grid>
                <Grid size={4} className={"border-1 d-row-between"}>
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
                          order_product: prev.order_product.map((product: any) => (
                            product.product_id === item?.product_id ? {
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
                          order_product: prev.order_product.map((product: any) => (
                            product.product_id === item?.product_id ? {
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
                  <Div className={"fs-1-0rem"}>
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
                          order_product: prev.order_product.map((product: any) => (
                            product.product_id === item?.product_id ? {
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
                          order_product: prev.order_product.map((product: any) => (
                            product.product_id === item?.product_id ? {
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
                </Grid>
                <Grid size={1} className={"d-center"}>
                  <Icons
                    key={"X"}
                    name={"X"}
                    className={"w-16 h-16 black"}
                    onClick={() => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        order_product: [
                          ...prev.order_product.slice(0, index),
                          ...prev.order_product.slice(index + 1),
                        ],
                      }));
                    }}
                  />
                </Grid>
                {/** 마지막 항목 제외 hr 추가 */}
                {index !== OBJECT?.order_product?.length - 1 && (
                  <Grid size={12}>
                    <Hr px={5} className={"mb-10"} />
                  </Grid>
                )}
              </Grid>
            )
          ))}
        </Grid>
        <Hr px={40} className={"bg-burgundy"} />
        <Grid size={12} className={"d-center"}>
          <Div className={"fs-1-0rem me-10"}>
            총 금액  :
          </Div>
          <Div className={"fs-0-8rem me-5"}>
            ₩
          </Div>
          <Div className={"fs-1-2rem fw-600"}>
            {numeral(OBJECT?.order_total_price).format("0,0")}
          </Div>
        </Grid>
      </Card>
    );
    // 3. order
    const orderSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius-1 p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"주문 유형"}
              required={true}
              value={OBJECT?.order_category}
              inputRef={REFS?.[i]?.order_category}
              error={ERRORS?.[i]?.order_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_category: e.target.value,
                }));
              }}
            >
              {["reservation", "buy"].map((item: string, idx: number) => (
                <MenuItem key={idx} value={item} className={"fs-0-8rem"}>
                  {item === "reservation" && "매장 예약"}
                  {item === "buy" && "제품 구매"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이름"}
              required={true}
              value={OBJECT?.order_name}
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
              variant={"standard"}
              label={"이메일"}
              required={true}
              value={OBJECT?.order_email}
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
              variant={"standard"}
              label={"전화번호"}
              required={true}
              value={OBJECT?.order_phone}
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
              variant={"standard"}
              required={true}
              label={"인원"}
              value={OBJECT?.order_headcount}
              inputRef={REFS?.[i]?.order_headcount}
              error={ERRORS?.[i]?.order_headcount}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_headcount: e.target.value,
                }));
              }}
            >
              {Array.from({ length: 20 }, (_, idx) => (
                <MenuItem key={idx} value={(idx + 1).toString()} className={"fs-0-8rem"}>
                  {idx + 1}
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
    // 4. btn
    const btnSection = (i: number) => (
      <Card className={"fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
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
                flowUpdate();
              }}
            >
              수정하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {productSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {orderSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {btnSection(0)}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : updateNode()}
    </>
  );
};
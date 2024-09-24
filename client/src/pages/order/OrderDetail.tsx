// OrderDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate, useResponsive } from "@imports/ImportHooks";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios, numeral,  } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Div, Select, Br, Input, Hr, Btn, Img, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, location_id, isAdmin,
  } = useCommonValue();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();
  const {
    dayFmt, getDayFmt,
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateOrder();

  // 1. common -------------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);
  const [imageSize, setImageSize] = useState<string>("");

  // 2-2. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setImageSize("w-50 h-50 hover");
    }
    else if (isSm) {
      setImageSize("w-60 h-60 hover");
    }
    else if (isMd) {
      setImageSize("w-70 h-70 hover");
    }
    else if (isLg) {
      setImageSize("w-80 h-80 hover");
    }
    else if (isXl) {
      setImageSize("w-100 h-100 hover");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

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

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = () => {
    setLOADING(true);
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: OBJECT?._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate('/order/list', {
          state: {
            order_name: OBJECT?.order_name,
            order_phone: OBJECT?.order_phone,
          },
        });
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700 fadeIn"}
      >
        주문 상세
      </Div>
    );
    // 2. product
    const productSection = (i: number) => (
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          {OBJECT?.order_product?.map((item: any, index: number) => (
            item.product_name && (
              <Grid container spacing={2} columns={12} key={index}>
                <Grid size={3} className={"d-left"}>
                  <Img
                    key={item?.product_images?.[0]}
                    src={item?.product_images?.[0]}
                    group={"product"}
                    className={imageSize}
                  />
                </Grid>
                <Grid size={5}>
                  <Grid container spacing={1} columns={12}>
                    <Grid size={12} className={"d-left"}>
                      <Div className={"fs-1-4rem fw-600"}>
                        {item?.product_name}
                      </Div>
                    </Grid>
                    <Grid size={12} className={"d-left"}>
                      <Div className={"fs-0-8rem me-5"}>
                        ₩
                      </Div>
                      <Div className={"fs-1-0rem"}>
                        {numeral(item?.product_price).format("0,0")}
                      </Div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid size={3} className={"d-center"}>
                  <Div className={"d-center border-1"}>
                    <Icons
                      key={"Minus"}
                      name={"Minus"}
                      className={"w-10 h-10"}
                    />
                    <Div className={"fs-1-0rem"}>
                      {item?.product_count}
                    </Div>
                    <Icons
                      key={"Plus"}
                      name={"Plus"}
                      className={"w-10 h-10"}
                    />
                  </Div>
                </Grid>
                {/** 마지막 항목 제외 hr 추가 */}
                {index !== OBJECT?.order_product?.length - 1 && (
                  <Grid size={12}>
                    <Hr px={5} h={1} className={"mb-10"} />
                  </Grid>
                )}
              </Grid>
            )
          ))}
        </Grid>
        <Hr px={40} h={10} className={"bg-burgundy"} />
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
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              disabled={true}
              label={"주문 날짜"}
              className={"border-bottom-1"}
              value={OBJECT?.order_date}
            />
          </Grid>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"주문 유형"}
              required={true}
              disabled={true}
              className={"border-bottom-1"}
              value={OBJECT?.order_category}
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
              disabled={true}
              className={"border-bottom-1"}
              value={OBJECT?.order_name}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이메일"}
              required={true}
              disabled={true}
              className={"border-bottom-1"}
              value={OBJECT?.order_email}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"전화번호"}
              required={true}
              disabled={true}
              className={"border-bottom-1"}
              value={OBJECT?.order_phone}
            />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-10 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={6} className={"d-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {getDayFmt(OBJECT?.order_regDt)}
            </Div>
          </Grid>
          <Grid size={6} className={"d-right"}>
            <Icons
              key={"Person"}
              name={"Person"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {OBJECT?.order_name}
            </Div>
          </Grid>
          <Grid size={6} className={"d-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-5"}
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
          <Grid size={6} className={"d-right"}>
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
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                flowDelete();
              }}
            >
              삭제
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : productSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {orderSection(0)}
          </Grid>
          <Hr px={20} h={10} w={95} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center mt-n20"}>
            {filterSection(0)}
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
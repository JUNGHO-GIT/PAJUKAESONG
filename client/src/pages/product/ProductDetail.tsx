// ProductDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateProduct } from "@imports/ImportValidates";
import { axios, numeral, setSession, getSession } from "@imports/ImportUtils";
import { Swiper, SwiperSlide, Pagination } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Input } from "@imports/ImportContainers";
import { Div, Img, Hr, Br, Icons, Btn } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, isAdmin, URL, SUBFIX } = useCommonValue();
  const { isXxs } = useResponsive();
  const { validate } = useValidateProduct();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Product);
  const [orderCount, setOrderCount] = useState<number>(1);
  const [orderPrice, setOrderPrice] = useState<number>(1);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Product);
      setOrderPrice(Number(res.data.result.product_price));
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
  const flowSave = async (extra: string) => {
    const orderProduct = {
      product_id: OBJECT?._id,
      product_name: OBJECT?.product_name,
      product_count: orderCount,
      product_price: orderPrice,
      product_images: OBJECT?.product_images,
    };
    const existOrderProduct = getSession("order_product", "", "");

    if (extra === "buy") {
      setSession("order_product", "", "", [orderProduct]);
    }
    else {
      if (existOrderProduct && existOrderProduct.length > 0) {

        // 기존에 같은 product_id가 있는지 확인
        const productIndex = existOrderProduct.findIndex((item: any) => (
          item.product_id === orderProduct.product_id
        ));

        // 중복된 항목이 있으면 덮어씌움
        if (productIndex > -1) {
          existOrderProduct[productIndex] = orderProduct;
        }
        // 중복된 항목이 없으면 새로운 항목 추가
        else {
          existOrderProduct.push(orderProduct);
        }
        setSession("order_product", "", "", existOrderProduct);
      }
      else {
        setSession("order_product", "", "", [orderProduct]);
      }
    }

    navigate(`/order/save`);
  };

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
        navigate(`/product/list`);
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

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. detail
    const detailSection = () => {
      const imageFragment = (item: any) => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              pagination={{
                clickable: true,
                enabled: true,
                el: ".product-pagination",
              }}
              modules={[
                Pagination,
              ]}
            >
              {item?.product_images?.map((image: string, index: number) => (
                <SwiperSlide className={"w-100p h-100p d-center"} key={`image-${index}`}>
                  <Img
                    max={isXxs ? 600 : 700}
                    hover={false}
                    shadow={true}
                    radius={true}
                    group={"product"}
                    src={image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"product-pagination transform-none"} />
          </Grid>
        </Grid>
      );
      const descFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {item?.product_name}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Dot"}
              name={"Dot"}
              fill={"grey"}
              className={"w-15 h-15 dark"}
            />
            <Div className={"fs-1-2rem fw-500 light-black"}>
              {item?.product_description}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Icons
              key={"Won"}
              name={"Won"}
              className={"w-15 h-15 dark"}
            />
            <Div className={"fs-1-1rem fw-500 light-black"}>
              {numeral(item?.product_price).format("0,0")}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"p-10"}>
          <Grid size={12} className={"d-col-center"} key={`detail-${0}`}>
            {imageFragment(OBJECT)}
            <Hr px={40} className={"bg-burgundy"} />
            {descFragment(OBJECT)}
          </Grid>
        </Grid>
      )
    };
    // 3. price
    const priceSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={6}>
          <Input
            label={"총 금액"}
            value={numeral(orderPrice).format("0,0")}
            readOnly={true}
            error={orderPrice < 0}
            startadornment={
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15 h-15"}
              />
            }
          />
        </Grid>
        <Grid size={6}>
          <Input
            label={"수량"}
            value={orderCount}
            readOnly={true}
            error={orderCount < 0}
            endadornment={
              <Div className={"d-center"}>
                <Icons
                  name={"Minus"}
                  className={"w-15 h-15"}
                  onClick={() => {
                    const value = orderCount;
                    const newValue = value < 1 ? 1 : value - 1;
                    if (newValue <= 1) {
                      setOrderCount(1);
                      setOrderPrice(Number(OBJECT?.product_price));
                    }
                    else if (!isNaN(newValue) && newValue <= 30) {
                      setOrderCount(newValue);
                      setOrderPrice(Number(OBJECT?.product_price) * newValue);
                    }
                  }}
                />
                <Icons
                  name={"Plus"}
                  className={"w-15 h-15"}
                  onClick={() => {
                    const value = orderCount;
                    const newValue = value < 1 ? 1 : value + 1;
                    if (newValue <= 1) {
                      setOrderCount(1);
                      setOrderPrice(Number(OBJECT?.product_price));
                    }
                    else if (!isNaN(newValue) && newValue <= 30) {
                      setOrderCount(newValue);
                      setOrderPrice(Number(OBJECT?.product_price) * newValue);
                    }
                  }}
                />
              </Div>
            }
          />
        </Grid>
      </Grid>
    );
    // 3. btn
    const btnSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              flowSave("cart");
            }}
          >
            장바구니
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowSave("buy");
            }}
          >
            주문하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 4. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy"}
            onClick={() => {
              navigate(`/product/list`);
            }}
          >
            목록으로
          </Div>
        </Grid>
        <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-row-right" : "d-none"}`}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
            onClick={() => {
              navigate("/product/update", {
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
        <Grid container spacing={0} columns={12} className={"py-50"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : detailSection()}
            <Hr px={40} className={"bg-grey"} />
            {priceSection()}
            <Br px={20} />
            {btnSection()}
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
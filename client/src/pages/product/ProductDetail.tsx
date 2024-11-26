// ProductDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateProduct } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios, Swiper, SwiperSlide, Pagination } from "@importLibs";
import { insertComma, getSession, setSession } from "@importScripts";
import { Product } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input } from "@importContainers";
import { Div, Img, Hr, Br, Icons, Btn, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const ProductDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { xxs, paperClass } = useResponsive();
  const { validate } = useValidateProduct();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
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
        open: true,
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
        navigate(`/product/list`);
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

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. detail
    const detailSection = () => {
      const imageFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={0} key={`image-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-col-center"}>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    className={"p-5px"}
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
                      <SwiperSlide className={"w-100p h-100p"} key={`image-${index}`}>
                        <Img
                          max={xxs ? 600 : 700}
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
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"product-pagination transform-none"} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      const descFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`desc-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"fs-1-8rem fw-700 black"}>
                    {item?.product_name}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Dot"}
                    name={"Dot"}
                    fill={"grey"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-1-2rem fw-500 black"}>
                    {item?.product_description}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-left"}>
                  <Icons
                    key={"Won"}
                    name={"Won"}
                    className={"w-15px h-15px dark"}
                  />
                  <Div className={"fs-1-1rem fw-500 black"}>
                    {insertComma(item?.product_price || "0")}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-0 shadow-0"}>
          {imageFragment()}
          <Hr m={40} className={"bg-burgundy h-2px"} />
          {descFragment()}
        </Card>
      )
    };
    // 3. price
    const priceSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={6}>
          <Input
            readOnly={true}
            label={"총 금액"}
            value={insertComma(String(orderPrice || "0"))}
            error={orderPrice < 0}
            startadornment={
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15px h-15px"}
              />
            }
          />
        </Grid>
        <Grid size={6}>
          <Input
            readOnly={true}
            label={"수량"}
            value={insertComma(String(orderCount || "0"))}
            error={orderCount < 0}
            endadornment={
              <Div className={"d-center"}>
                <Icons
                  name={"Minus"}
                  className={"w-15px h-15px"}
                  onClick={() => {
                    // 빈값 처리
                    let value = orderCount < 1 ? 1 : orderCount - 1;
                    // 최소값 처리
                    value = value < 1 ? 1 : value;
                    // object 설정
                    setOrderCount(value);
                    setOrderPrice(Number(OBJECT?.product_price) * value);
                  }}
                />
                <Icons
                  name={"Plus"}
                  className={"w-15px h-15px"}
                  onClick={() => {
                    // 빈값 처리
                    let value = orderCount < 1 ? 1 : orderCount + 1;
                    // 최대값 처리
                    value = value > 20 ? 20 : value;
                    // object 설정
                    setOrderCount(value);
                    setOrderPrice(Number(OBJECT?.product_price) * value);
                  }}
                />
              </Div>
            }
          />
        </Grid>
      </Grid>
    );
    // 3. buy
    const buySection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
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
            className={"w-100p fs-1-0rem bg-black"}
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
        {detailSection()}
        <Hr m={60} className={"bg-light h-5px"} />
        {priceSection()}
        <Br m={20} />
        {buySection()}
        <Hr m={60} className={"bg-light h-5px"} />
        {filterSection()}
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
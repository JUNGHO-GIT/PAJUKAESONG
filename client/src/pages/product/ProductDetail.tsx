// ProductDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { axios, numeral } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Div, Img, Hr, Icons, Input, Btn, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX, TITLE
  } = useCommonValue();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Product);
  const [imageSize, setImageSize] = useState<string>("");
  const [orderCount, setOrderCount] = useState<number>(1);
  const [orderPrice, setOrderPrice] = useState<number>(1);

  // 2-2. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setImageSize("w-210 h-210");
    }
    else if (isSm) {
      setImageSize("w-230 h-230");
    }
    else if (isMd) {
      setImageSize("w-250 h-250");
    }
    else if (isLg) {
      setImageSize("w-270 h-270");
    }
    else if (isXl) {
      setImageSize("w-300 h-300");
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
      setOBJECT(res.data.result || Product);
      setOrderPrice(Number(res.data.result.product_price));
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
  const flowSave = (extra: string) => {
    const orderProduct: any = {
      product_id: OBJECT?._id,
      product_name: OBJECT?.product_name,
      product_count: orderCount,
      product_price: orderPrice,
      product_images: OBJECT?.product_images,
    };

    const existOrderProduct = sessionStorage.getItem(`${TITLE}_order_product`);

    if (extra === "buy") {
      sessionStorage.setItem(`${TITLE}_order_product`, JSON.stringify([]));
    }

    if (existOrderProduct) {
      const orderProducts = JSON.parse(existOrderProduct);

      // 기존에 같은 product_id가 있는지 확인
      const productIndex = orderProducts.findIndex(
        (product: any) => product.product_id === orderProduct.product_id
      );

      // 중복된 항목이 있으면 덮어씌움
      if (productIndex > -1) {
        orderProducts[productIndex] = orderProduct;
      }
      // 중복된 항목이 없으면 새로운 항목 추가
      else {
        orderProducts.push(orderProduct);
      }

      sessionStorage.setItem(`${TITLE}_order_product`, JSON.stringify(orderProducts));
    }
    else {
      sessionStorage.setItem(`${TITLE}_order_product`, JSON.stringify([orderProduct]));
    }

    navigate(`/order/save`);
  };


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
        navigate(`/product/list`);
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

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        제품 상세
      </Div>
    );
    // 2. detail
    const detailSection = (i: number) => (
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Img
              key={OBJECT?.product_images?.[0]}
              src={OBJECT?.product_images?.[0]}
              group={"product"}
              className={imageSize}
            />
          </Grid>
          <Hr className={"bg-burgundy"} px={40} h={10} />
          <Grid size={6} className={"d-left"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {OBJECT?.product_name}
            </Div>
          </Grid>
          <Grid size={6} className={"d-right"}>
            <Div className={"fs-1-2rem fw-500 dark"}>
              {OBJECT?.product_description}
            </Div>
          </Grid>
          <Grid size={12} className={"d-left"}>
            <Div className={"fs-1-2rem fw-600 black"}>
              {`₩ ${numeral(OBJECT?.product_price).format("0,0")}`}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter1
    const filter1Section = (i: number) => (
      <Card className={"px-10 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8 }} className={"d-center"}>
            <Input
              label={"총 금액"}
              value={numeral(orderPrice).format("0,0")}
              readOnly={true}
              error={orderPrice < 0}
              startadornment={
                <Icons
                  key={"Won"}
                  name={"Won"}
                  className={"w-15 h-20 black"}
                />
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} className={"d-center"}>
            <Input
              label={"수량"}
              value={orderCount}
              readOnly={true}
              error={orderCount < 0}
              endadornment={
                <Div className={"d-center"}>
                  <Icons
                    name={"Minus"}
                    className={"w-20 h-20 black"}
                    onClick={(e: any) => {
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
                    className={"w-20 h-20 black"}
                    onClick={(e: any) => {
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
          <Grid size={6} className={"d-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-grey"}
              onClick={() => {
                flowSave("cart");
              }}
            >
              장바구니
            </Btn>
          </Grid>
          <Grid size={6} className={"d-left"}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave("buy");
              }}
            >
              주문하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 4. filter2
    const filter2Section = (i: number) => (
      <Card className={"px-10 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-5"}
              onClick={() => {
                navigate(`/product/list`);
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-right" : "d-none"}`}>
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
            {LOADING ? <Loading /> : detailSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filter1Section(0)}
          </Grid>
          <Hr px={20} h={10} w={90} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filter2Section(0)}
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
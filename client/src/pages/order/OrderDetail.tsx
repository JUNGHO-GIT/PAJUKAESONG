// OrderDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { axios, numeral } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Div, Hr, Br, Img, Icons } from "@imports/ImportComponents";
import { Input, Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, location_id, TITLE
  } = useCommonValue();
  const {
    getDayFmt,
  } = useCommonDate();

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
        document?.querySelector("input[type=file]")?.remove();
        sessionStorage?.removeItem(`${TITLE}_order_product`);
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
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              주문 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => {
      const productFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={i}>
          <Grid container spacing={2} columns={12}>
            {OBJECT?.order_product?.map((item: any, index: number) => (
              item.product_name && (
                <Grid container spacing={2} columns={12} key={index}>
                  <Grid size={3} className={"d-column-left"}>
                    <Img
                      max={150}
                      hover={false}
                      shadow={true}
                      radius={false}
                      group={"product"}
                      src={item?.product_images?.[0]}
                      className={"w-70p h-70p"}
                    />
                  </Grid>
                  <Grid size={4} className={"d-column-left"}>
                    <Div className={"d-row-center"}>
                      <Div className={"fs-1-4rem fw-600 ms-10"}>
                        {item?.product_name}
                      </Div>
                    </Div>
                    <Div className={"d-row-center"}>
                      <Icons
                        key={"Won"}
                        name={"Won"}
                        className={"w-15 h-15 dark"}
                      />
                      <Div className={"fs-1-0rem"}>
                        {numeral(item?.product_price).format("0,0")}
                      </Div>
                    </Div>
                  </Grid>
                  <Grid size={4}>
                    <Div className={"border-1 d-row-between"}>
                      <Icons
                        key={"Minus"}
                        name={"Minus"}
                        className={"w-12 h-12 black"}
                      />
                      <Div className={"fs-1-0rem"}>
                        {item?.product_count}
                      </Div>
                      <Icons
                        key={"Plus"}
                        name={"Plus"}
                        className={"w-12 h-12 black"}
                      />
                    </Div>
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
        </Card>
      );
      const descFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Div className={"fs-1-0rem me-10"}>
                총 금액  :
              </Div>
              <Icons
                key={"Won"}
                name={"Won"}
                className={"w-15 h-15 dark"}
              />
              <Div className={"fs-1-2rem fw-600"}>
                {numeral(OBJECT?.order_total_price).format("0,0")}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      const orderFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Select
                variant={"standard"}
                label={"주문 유형"}
                required={true}
                disabled={true}
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
                value={OBJECT?.order_name}
              />
            </Grid>
            <Grid size={12}>
              <Input
                variant={"standard"}
                label={"이메일"}
                required={true}
                disabled={true}
                value={OBJECT?.order_email}
              />
            </Grid>
            <Grid size={12}>
              <Input
                variant={"standard"}
                label={"전화번호"}
                required={true}
                disabled={true}
                value={OBJECT?.order_phone}
              />
            </Grid>
            <Grid size={12}>
              <Input
                variant={"standard"}
                required={true}
                disabled={true}
                label={"주문 날짜"}
                value={getDayFmt(OBJECT?.order_regDt)}
              />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            {productFragment(0)}
          </Grid>
          <Grid size={12}>
            {descFragment(1)}
          </Grid>
          <Grid size={12}>
            {orderFragment(2)}
          </Grid>
        </Grid>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
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
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }}>
            {titleSection()}
            <Br px={30} />
            {detailSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {filterSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : saveNode()}
    </>
  );
};
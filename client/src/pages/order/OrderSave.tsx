// OrderSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Div, Select, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    dayFmt,
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateOrder();

  // 1. common -------------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/save`, {
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        주문 하기
      </Div>
    );
    // 2. save
    const saveSection = (i: number) => (
      <Card className={"border-1 radius shadow p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              label={"작성일"}
              className={"border-bottom-1"}
              disabled={true}
              value={dayFmt}
            />
          </Grid>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"주문 유형"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT.order_category}
              inputRef={REFS[i]?.order_category}
              error={ERRORS[i]?.order_category}
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
              className={"border-bottom-1"}
              value={OBJECT.order_name}
              inputRef={REFS[i]?.order_name}
              error={ERRORS[i]?.order_name}
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
              className={"border-bottom-1"}
              value={OBJECT.order_email}
              inputRef={REFS[i]?.order_email}
              error={ERRORS[i]?.order_email}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_email: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"전화번호"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT.order_phone}
              inputRef={REFS[i]?.order_phone}
              error={ERRORS[i]?.order_phone}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_phone: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"주문 제목"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT.order_title}
              inputRef={REFS[i]?.order_title}
              error={ERRORS[i]?.order_title}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_title: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              label={"주문 내용"}
              required={true}
              inputclass={"h-35vh"}
              value={OBJECT.order_content}
              inputRef={REFS[i]?.order_content}
              error={ERRORS[i]?.order_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  order_content: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave();
              }}
            >
              {"주문하기"}
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : saveSection(0)}
          </Grid>
          <Br px={5} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
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
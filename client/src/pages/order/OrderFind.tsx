// OrderFind.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateOrder } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Order } from "@imports/ImportSchemas";
import { Input } from "@imports/ImportContainers";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Paper, Grid, Card } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const OrderFind = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateOrder();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Order);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSearch = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "find")) {
      setLOADING(false);
      return;
    }
    axios.get(`${URL}${SUBFIX}/find`, {
      params: {
        order_name: OBJECT?.order_name,
        order_phone: OBJECT?.order_phone,
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        navigate('/order/list', {
          state: {
            order_name: OBJECT?.order_name,
            order_phone: OBJECT?.order_phone,
          },
        });
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

  // 7. findNode -----------------------------------------------------------------------------------
  const findNode = () => {
    // 2. find
    const findSection = () => {
      const findFragment = (item: any, i: number) => (
        <Grid container={true} spacing={3} key={`find-${i}`}>
          <Grid size={12}>
            <Input
              label={"이름"}
              required={true}
              helperText={"주문자 이름을 입력해주세요."}
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
              label={"전화번호"}
              required={true}
              helperText={"주문자 전화번호를 입력해주세요."}
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
        </Grid>
      );
      return (
        <Card className={"d-col-center border-2 radius-1 shadow-1 p-20"}>
          {findFragment(OBJECT, 0)}
        </Card>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
        <Grid size={12}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowSearch();
            }}
          >
            조회하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn p-20"}>
        {LOADING ? <Loading /> : (
          <>
            {findSection()}
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
      {findNode()}
    </>
  );
};
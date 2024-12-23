// OrderFind.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateOrder } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { axios } from "@importLibs";
import { Order } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input } from "@importContainers";
import { Br, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const OrderFind = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateOrder();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Order);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

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
        setLOADING(false);
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setLOADING(false);
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
  };

  // 7. findNode -----------------------------------------------------------------------------------
  const findNode = () => {
    // 2. find
    const findSection = () => {
      const findFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={3} key={`find-${i}`}>
              <Grid container={true} spacing={0}>
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
              </Grid>
              <Grid container={true} spacing={0}>
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
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {findFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={null}
        setPAGING={null}
        COUNT={null}
        flow={{
          flowSearch,
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {findSection()}
        <Br m={30} />
        {filterSection()}
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
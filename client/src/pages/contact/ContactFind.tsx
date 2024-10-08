// ContactFind.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useValidateContact } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Contact } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactFind = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    REFS, ERRORS, validate,
  } = useValidateContact();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Contact);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSearch = () => {
    setLOADING(true);
    if (!validate(OBJECT, null, "find")) {
      setLOADING(false);
      return;
    }
    axios.get(`${URL}${SUBFIX}/find`, {
      params: {
        contact_name: OBJECT?.contact_name,
        contact_phone: OBJECT?.contact_phone,
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        navigate('/contact/list', {
          state: {
            contact_name: OBJECT?.contact_name,
            contact_phone: OBJECT?.contact_phone,
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

  // 7. findNode -----------------------------------------------------------------------------------
  const findNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              문의 조회
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. find
    const findSection = () => {
      const findFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"이름"}
                required={true}
                helperText={"문의자 이름을 입력해주세요."}
                value={OBJECT?.contact_name}
                inputRef={REFS?.[i]?.contact_name}
                error={ERRORS?.[i]?.contact_name}
                onChange={(e: any) => {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    contact_name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"전화번호"}
                required={true}
                helperText={"문의자 전화번호를 입력해주세요."}
                value={OBJECT?.contact_phone}
                inputRef={REFS?.[i]?.contact_phone}
                error={ERRORS?.[i]?.contact_phone}
                placeholder={"010-1234-5678"}
                onChange={(e: any) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  const newValue = value.replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3');
                  if (value.length > 11) {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      contact_phone: prev.contact_phone,
                    }));
                  }
                  else {
                    setOBJECT((prev: any) => ({
                      ...prev,
                      contact_phone: newValue,
                    }));
                  }
                }}
              />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            {findFragment(0)}
          </Grid>
        </Grid>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSearch();
              }}
            >
              조회하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min90vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {findSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {btnSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : findNode()}
    </>
  );
};
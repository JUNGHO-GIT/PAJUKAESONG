// ContactFind.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useValidateContact } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Contact } from "@imports/ImportSchemas";
import { Div, Br, Input, Btn } from "@imports/ImportComponents";
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
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.get(`${URL}${SUBFIX}/find`, {
      params: {
        contact_name: OBJECT?.contact_name,
        contact_email: OBJECT?.contact_email,
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        navigate('/contact/list', {
          state: {
            contact_name: OBJECT?.contact_name,
            contact_email: OBJECT?.contact_email,
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
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        문의 조회
      </Div>
    );
    // 2. find
    const findSection = (i: number) => (
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={4} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이름"}
              required={true}
              className={"border-bottom-1"}
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
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이메일"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT?.contact_email}
              inputRef={REFS?.[i]?.contact_email}
              error={ERRORS?.[i]?.contact_email}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_email: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
        <Br px={30} />
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : findSection(0)}
          </Grid>
          <Br px={30} />
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
      {findNode()}
    </>
  );
};
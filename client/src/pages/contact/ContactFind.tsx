// ContactFind.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useResponsive, useValidateContact } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { CONTACT } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactFind = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId
  } = useCommon();
  const {
    REFS, ERRORS, validate,
  } = useValidateContact();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(CONTACT);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSearch = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.get(`${URL}${SUBFIX}/find`, {
      params: {
        contact_name: OBJECT.contact_name,
        contact_email: OBJECT.contact_email,
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate('/contact/list', {
          state: {
            contact_name: OBJECT.contact_name,
            contact_email: OBJECT.contact_email,
          },
        });
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch((err: any) => {
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
    const findSection = () => {
      const findFragment = (i: number) => (
        <Grid container spacing={3} key={i}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이름"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.contact_name}
              inputRef={REFS?.current?.contact_name}
              error={ERRORS?.contact_name}
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
              className={"border-bottom"}
              value={OBJECT.contact_email}
              inputRef={REFS?.current?.contact_email}
              error={ERRORS?.contact_email}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_email: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      );
      const btnFragment = () => (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Btn
              size={"large"}
              className={"w-100p bg-burgundy fs-1-2rem"}
              onClick={() => {
                flowSearch();
              }}
            >
              조회하기
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-40 fadeIn"}>
          {findFragment(0)}
          <Br px={50} />
          {btnFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Grid size={{ xs:12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 11, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {findSection()}
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
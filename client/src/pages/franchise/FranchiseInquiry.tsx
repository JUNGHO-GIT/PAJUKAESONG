// FranchiseInquiry.tsx

import { useState } from "@imports/ImportReacts";
import { useCommon, useValidateFranchise } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { FRANCHISE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseInquiry = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId
  } = useCommon();
  const {
    REFS, ERRORS, validate,
  } = useValidateFranchise();

  // 1. common -------------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(FRANCHISE);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/save/inquiry`, {
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate('/franchise/list');
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

  // 7. inquiryNode --------------------------------------------------------------------------------
  const inquiryNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        가맹 문의
      </Div>
    );
    // 2. inquiry
    const inquirySection = () => {
      const inquiryFragment = () => (
        <Grid container spacing={3}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이름"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.franchise_inquiry_name}
              inputRef={REFS?.current?.franchise_inquiry_name}
              error={ERRORS?.franchise_inquiry_name}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_inquiry_name: e.target.value,
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
              value={OBJECT.franchise_inquiry_email}
              inputRef={REFS?.current?.franchise_inquiry_email}
              error={ERRORS?.franchise_inquiry_email}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_inquiry_email: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"전화번호"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.franchise_inquiry_phone}
              inputRef={REFS?.current?.franchise_inquiry_phone}
              error={ERRORS?.franchise_inquiry_phone}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_inquiry_phone: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"문의 제목"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.franchise_inquiry_title}
              inputRef={REFS?.current?.franchise_inquiry_title}
              error={ERRORS?.franchise_inquiry_title}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_inquiry_title: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              label={"문의 내용"}
              required={true}
              inputclass={"h-35vh"}
              value={OBJECT.franchise_inquiry_content}
              inputRef={REFS?.current?.franchise_inquiry_content}
              error={ERRORS?.franchise_inquiry_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_inquiry_content: e.target.value,
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
                flowSave();
              }}
            >
              문의하기
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-40 fadeIn"}>
          {inquiryFragment()}
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
            {inquirySection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {inquiryNode()}
    </>
  );
};
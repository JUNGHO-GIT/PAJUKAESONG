// ContactInquiry.tsx

import { useState } from "@imports/ImportReacts";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactInquiry = () => {

  // 1. common -------------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>({
    inquiry_name: "",
    inquiry_phone: "",
    inquiry_email: "",
    inquiry_title: "",
    inquiry_content: "",
    inquiry_date: "",
  });

  // 7. inquiryNode --------------------------------------------------------------------------------
  const inquiryNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        1:1 문의
      </Div>
    );
    // 2. inquiry
    const inquirySection = () => (
      <Card className={"border radius shadow p-40"}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이름"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.inquiry_name}
              onChange={(e: any) => {
                setOBJECT({
                  ...OBJECT,
                  inquiry_name: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"전화번호"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.inquiry_phone}
              onChange={(e: any) => {
                setOBJECT({
                  ...OBJECT,
                  inquiry_phone: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"이메일"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.inquiry_email}
              onChange={(e: any) => {
                setOBJECT({
                  ...OBJECT,
                  inquiry_email: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"문의 제목"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.inquiry_title}
              onChange={(e: any) => {
                setOBJECT({
                  ...OBJECT,
                  inquiry_title: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12}>
            <Br px={10} />
            <Div
              className={"d-left"}
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontWeight: 400,
                fontSize: "0.9rem",
                lineHeight: "1.4375em",
              }}
            >
              문의 내용 *
            </Div>
            <Br px={5} />
            <TextArea
              required={true}
              className={"h-35vh"}
              value={OBJECT.inquiry_content}
              onChange={(e: any) => {
                setOBJECT({
                  ...OBJECT,
                  inquiry_content: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid size={12}>
            <Btn
              size={"large"}
              className={"w-100p fs-1-2rem"}
              onClick={() => {
                alert("문의가 접수되었습니다.");
              }}
            >
              문의하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid
            size={{ xs:12 }}
            className={"d-center"}
          >
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {inquirySection()}
          </Grid>
          <Br px={10} />
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
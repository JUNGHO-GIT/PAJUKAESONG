// AboutGreeting.tsx

import { Div, Img } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const AboutGreeting = () => {

  // 7. greetingNode -------------------------------------------------------------------------------
  const greetingNode = () => {
    // 2. greeting
    const greetingSection = () => {
      const greetingFragment = () => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-8rem fw-700"}>
              여러분 반갑습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              1995년 개인 창업하였을 때부터, 프랜차이즈 회사를 운영하는 현재까지 ‘장사는 제 양심을 파는 것’이라고 생각하였기에 동기와 과정을 중요시하고, ‘성실, 공의, 정직’의 원칙 아래 공동선의식 동행(나에게도 남에게도 유익하게)을 (주)이삭의 사명으로 삼고, ‘정당하고 바른 기업’이 되고자 노력하며 ‘이삭’을 운영하고 있습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              힘들었던 시절 '이삭토스트'를 창업하여 자립할 수 있었고, 우연히 만난 한 어려운 부부의 자립을 도와드리는 일이 계기가 되어 '이삭토스트 1호 가맹점'이 탄생했습니다. 그렇게 만들어진 '(주)이삭'은 오늘날 수많은 가정에게 희망을 주고 길을 여는‘이삭토스트’가 되었습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              '이삭토스트'는 어쩌면 저와 가맹점주님들, 창업을 꿈꾸시는 예비 가맹 점주님께 '희망'의 다른 이름일지도 모르겠습니다. '이삭토스트'를 통해 고객과 가맹점주님들, 임직원 및 협력업체들이 더불어 행복하시기를 진심으로 바랍니다. 아울러 '이삭'이라는 이름의 뜻처럼, 기쁨과 웃음, 행복과 축복을 유통하는 삶이 되시기를 소망합니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Div className={"fs-1-5rem fw-500 me-20"}>
              대표이사
            </Div>
            <Div className={"fs-1-5rem fw-700 me-10"}>
              강 민 서
            </Div>
            <Div className={"d-row-center"}>
              <Img
                max={30}
                hover={false}
                shadow={false}
                radius={false}
                group={"main"}
                src={"stamp.webp"}
              />
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`save-${0}`}>
            {greetingFragment()}
          </Grid>
        </Grid>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-50"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {greetingSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {greetingNode()}
    </>
  );
};
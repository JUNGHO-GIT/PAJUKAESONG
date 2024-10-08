// FranchiseInfo.tsx

import { useState } from "@imports/ImportReacts";
import { useResponsive } from "@imports/ImportHooks";
import { Div, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid, Stepper, Step, StepLabel } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseInfo = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    isXs
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [activeStep, setActiveStep] = useState(0);
  const stepArray = [
    { label: '창업상담 문의', description: '전화 및 현장상담' },
    { label: '상권조사', description: '유동인구 및 세대수 기반으로 조사' },
    { label: '본사계약체결', description: '계약서 작성' },
    { label: '매장계약', description: '상가 임대차 계약' },
    { label: '인테리어 진행', description: '매장 실측 및 공사 진행' },
    { label: '본사교육', description: '조리교육 및 전반적인 운영교육' },
    { label: '오픈리허설', description: '오픈 전 최종 점검 및 테스트' },
    { label: '매장오픈', description: '계약부터 오픈까지 4~5주 소요' },
  ];

  // 7. infoNode -----------------------------------------------------------------------------------
  const infoNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              가맹 안내
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. info
    const infoSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              가맹점 창업 안내
            </Div>
          </Grid>
          <Grid size={12} className={"d-column-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              1995년 개인 창업하였을 때부터, 프랜차이즈 회사를 운영하는 현재까지 ‘장사는 제 양심을 파는 것’이라고 생각하였기에 동기와 과정을 중요시하고, ‘성실, 공의, 정직’의 원칙 아래 공동선의식 동행(나에게도 남에게도 유익하게)을 (주)이삭의 사명으로 삼고, ‘정당하고 바른 기업’이 되고자 노력하며 ‘이삭’을 운영하고 있습니다.
            </Div>
            <Br px={20} />
            <Div className={"fs-1-0rem fw-500"}>
              힘들었던 시절 '이삭토스트'를 창업하여 자립할 수 있었고, 우연히 만난 한 어려운 부부의 자립을 도와드리는 일이 계기가 되어 '이삭토스트 1호 가맹점'이 탄생했습니다. 그렇게 만들어진 '(주)이삭'은 오늘날 수많은 가정에게 희망을 주고 길을 여는‘이삭토스트’가 되었습니다.
            </Div>
            <Br px={20} />
            <Div className={"fs-1-0rem fw-500"}>
              '이삭토스트'는 어쩌면 저와 가맹점주님들, 창업을 꿈꾸시는 예비 가맹 점주님께 '희망'의 다른 이름일지도 모르겠습니다. '이삭토스트'를 통해 고객과 가맹점주님들, 임직원 및 협력업체들이 더불어 행복하시기를 진심으로 바랍니다. 아울러 '이삭'이라는 이름의 뜻처럼, 기쁨과 웃음, 행복과 축복을 유통하는 삶이 되시기를 소망합니다.
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. step
    const stepSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              가맹점 창업 절차
            </Div>
          </Grid>
          {isXs ? (
            <Grid size={12} className={"d-column-center"}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={false}
                orientation={"vertical"}
                className={"w-100p"}
              >
                {stepArray.map((step: any, index: number) => (
                  <Step key={step.label}>
                    <StepLabel
                      icon={index + 1}
                      className={"pointer"}
                      onClick={() => {
                        setActiveStep(index);
                      }}
                    >
                      <Div className={"fs-1-2rem fw-700"}>
                        {step.label}
                      </Div>
                    </StepLabel>
                    <Br px={10} />
                    <Div className={"fs-0-8rem fw-400 d-fit ms-30"}>
                      {step.description}
                    </Div>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          ) : (
            <Grid size={12} className={"d-column-center"}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={true}
                orientation={"horizontal"}
                className={"w-100p"}
              >
                {stepArray.slice(0, 4).map((step: any, index: number) => (
                  <Step key={step.label}>
                    <StepLabel
                      icon={index + 1}
                      className={"pointer"}
                      onClick={() => {
                        setActiveStep(index);
                      }}
                    >
                      <Div className={"d-column-center"}>
                        <Div className={"fs-1-2rem fw-700"}>
                          {step.label}
                        </Div>
                        <Br px={20} />
                        <Div className={"fs-0-8rem"}>
                          {step.description}
                        </Div>
                      </Div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Br px={40} />
              <Stepper activeStep={activeStep - 4} alternativeLabel={true} className={"w-100p"}>
                {stepArray.slice(4, 8).map((step: any, index: number) => (
                  <Step key={step.label}>
                    <StepLabel
                      icon={index + 5}
                      className={"pointer"}
                      onClick={() => {
                        setActiveStep(index + 4);
                      }}
                    >
                      <Div className={"d-column"}>
                        <Div className={"fs-1-2rem fw-700"}>
                          {step.label}
                        </Div>
                        <Br px={20} />
                        <Div className={"fs-0-8rem"}>
                          {step.description}
                        </Div>
                      </Div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          )}
        </Grid>
      </Card>
    );
    // 4. cost
    const costSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              가맹비 및 창업비용
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              구분
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              내용
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem fw-500"}>
              비용
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy"} />
          {/** row 1 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              가맹비
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              피자마루상호/상표사용
              <Br px={5} />
              경영노하우 전수 상권분석 및 상권보호
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              500 만원
            </Div>
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          {/** row 3 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              교육비
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              기술 지원, 운영 교육
              <Br px={5} />
              본사 교육 프로그램 진행 및 현장 교육
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              300 만원
            </Div>
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          {/** row 4 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              보증금
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              계약 이행 보증금
              <Br px={5} />
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              300 만원
            </Div>
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          {/** row 5 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              주방기기
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              오븐기, 냉동냉장고, 도우기계
              <Br px={5} />
              믹서기, 숙성고,
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              2,100 만원
            </Div>
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          {/** row 6 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              보조기기
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              저울, 온도계, 도우박스
              <Br px={5} />
              도우마늘기, 도우절단기
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              400 만원
            </Div>
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          {/** row 7 **/}
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              인테리어
            </Div>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              실내, 주방
            </Div>
          </Grid>
          <Grid size={3} className={"d-center"}>
            <Div className={"fs-0-8rem"}>
              1,860 만원
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={20} />
            {infoSection()}
            <Br px={20} />
            {stepSection()}
            <Br px={20} />
            {costSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {infoNode()}
    </>
  );
};
// FranchiseInfo.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useResponsive } from "@imports/ImportHooks";
import { Loading } from "@imports/ImportLayouts";
import { Div, Br, Hr } from "@imports/ImportComponents";
import { Paper, Grid, Stepper, Step, StepLabel } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseInfo = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { isXxs, isXs } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [OBJECT_INFO, setOBJECT_INFO] = useState<any>([
    {
      info1: (
        "1995년 개인 창업하였을 때부터, 프랜차이즈 회사를 운영하는 현재까지 ‘장사는 제 양심을 파는 것’이라고 생각하였기에 동기와 과정을 중요시하고, ‘성실, 공의, 정직’의 원칙 아래 공동선의식 동행(나에게도 남에게도 유익하게)을 (주)이삭의 사명으로 삼고, ‘정당하고 바른 기업’이 되고자 노력하며 ‘이삭’을 운영하고 있습니다."
      ),
      info2: (
        "힘들었던 시절 '이삭토스트'를 창업하여 자립할 수 있었고, 우연히 만난 한 어려운 부부의 자립을 도와드리는 일이 계기가 되어 '이삭토스트 1호 가맹점'이 탄생했습니다. 그렇게 만들어진 '(주)이삭'은 오늘날 수많은 가정에게 희망을 주고 길을 여는‘이삭토스트’가 되었습니다."
      ),
    }
  ]);
  const [OBJECT_STEP, setOBJECT_STEP] = useState<any>([
    {
      label: '창업상담 문의',
      desc: '전화 및 현장상담'
    },
    {
      label: '상권조사',
      desc: '유동인구 및 세대수 기반으로 조사'
    },
    {
      label: '본사계약체결',
      desc: '계약서 작성'
    },
    {
      label: '매장계약',
      desc: '상가 임대차 계약'
    },
    {
      label: '인테리어 진행',
      desc: '매장 실측 및 공사 진행'
    },
    {
      label: '본사교육',
      desc: '조리교육 및 전반적인 운영교육'
    },
    {
      label: '오픈리허설',
      desc: '오픈 전 최종 점검 및 테스트'
    },
    {
      label: '매장오픈',
      desc: '계약부터 오픈까지 4~5주 소요'
    },
  ]);
  const [OBJECT_COST, setOBJECT_COST] = useState<any>([
    {
      label: '가맹비',
      desc: '피자마루상호/상표사용, 경영노하우 전수 상권분석 및 상권보호',
      cost: '500 만원'
    },
    {
      label: '교육비',
      desc: '기술 지원, 운영 교육, 본사 교육 프로그램 진행 및 현장 교육',
      cost: '300 만원'
    },
    {
      label: '보증금',
      desc: '계약 이행 보증금',
      cost: '300 만원'
    },
    {
      label: '주방기기',
      desc: '오븐기, 냉동냉장고, 도우기계, 믹서기, 숙성고,',
      cost: '2,100 만원'
    },
    {
      label: '보조기기',
      desc: '저울, 온도계, 도우박스, 도우마늘기, 도우절단기',
      cost: '400 만원'
    },
    {
      label: '인테리어',
      desc: '실내, 주방',
      cost: '1,860 만원'
    },
  ]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

  // 7. infoNode -----------------------------------------------------------------------------------
  const infoNode = () => {
    // 1. info
    const infoSection = () => {
      const titleFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              가맹점 창업 안내
            </Div>
          </Grid>
        </Grid>
      );
      const infoFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              {item.info1}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              {item.info2}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          {OBJECT_INFO?.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`info-${i}`}>
              {i === 0 && (
                <>
                  {titleFragment()}
                  <Br px={20} />
                </>
              )}
              {infoFragment(item)}
            </Grid>
          ))}
        </Grid>
      );
    };

    // 2. step
    const stepSection = () => {
      const titleFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              가맹점 창업 절차
            </Div>
          </Grid>
        </Grid>
      );
      const stepFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          {isXxs || isXs ? (
            <Grid size={12}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={false}
                orientation={"vertical"}
                className={"w-100p"}
              >
                {item.map((step: any, index: number) => (
                  <Step key={index}>
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
                      {step.desc}
                    </Div>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          ) : (
            <Grid size={12}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={true}
                orientation={"horizontal"}
                className={"w-100p"}
              >
                {item.slice(0, 4).map((step: any, index: number) => (
                  <Step key={index}>
                    <StepLabel
                      icon={index + 1}
                      className={"pointer"}
                      onClick={() => {
                        setActiveStep(index);
                      }}
                    >
                      <Div className={"d-col-center"}>
                        <Div className={"fs-1-2rem fw-700"}>
                          {step.label}
                        </Div>
                        <Br px={20} />
                        <Div className={"fs-0-8rem"}>
                          {step.desc}
                        </Div>
                      </Div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Br px={40} />
              <Stepper
                activeStep={activeStep - 4}
                alternativeLabel={true}
                className={"w-100p"}
              >
                {item.slice(4, 8).map((step: any, index: number) => (
                  <Step key={index}>
                    <StepLabel
                      icon={index + 5}
                      className={"pointer"}
                      onClick={() => {
                        setActiveStep(index + 4);
                      }}
                    >
                      <Div className={"d-col-center"}>
                        <Div className={"fs-1-2rem fw-700"}>
                          {step.label}
                        </Div>
                        <Br px={20} />
                        <Div className={"fs-0-8rem"}>
                          {step.desc}
                        </Div>
                      </Div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          )}
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`step-${0}`}>
            {titleFragment()}
            {<Br px={20} />}
            {stepFragment(OBJECT_STEP)}
          </Grid>
        </Grid>
      );
    };

    // 4. cost
    const costSection = () => {
      const titleFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              가맹비 및 창업비용
            </Div>
          </Grid>
        </Grid>
      );
      const headFragment = () => (
        <Grid container spacing={2} columns={12}>
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
        </Grid>
      );
      const costFragment = (item: any) => (
        <Grid container spacing={2} columns={12}>
          <Grid size={3}>
            <Div className={"fs-0-8rem"}>
              {item.label}
            </Div>
          </Grid>
          <Grid size={6}>
            <Div className={"fs-0-8rem"}>
              {item.desc}
            </Div>
          </Grid>
          <Grid size={3}>
            <Div className={"fs-0-8rem"}>
              {item.cost}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          {OBJECT_COST?.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`cost-${i}`}>
              {i === 0 && (
                <>
                  {titleFragment()}
                  <Br px={20} />
                  {headFragment()}
                  <Hr px={40} className={"bg-burgundy"} />
                </>
              )}
              {costFragment(item)}
              {i < OBJECT_COST.length - 1 && <Hr px={40} className={"bg-light-grey"} />}
            </Grid>
          ))}
        </Grid>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-50"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : infoSection()}
            <Br px={30} />
            {stepSection()}
            <Br px={30} />
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
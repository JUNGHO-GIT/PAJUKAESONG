// FranchiseInfo.tsx

import { useState, useEffect } from "@importReacts";
import { useResponsive } from "@importHooks";
import { Loader } from "@importLayouts";
import { Div, Br, Hr } from "@importComponents";
import { Paper, Grid, Card, Stepper, Step, StepLabel } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseInfo = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { isXxs, isXs } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const OBJECT_STEP = [
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
  ];
  const OBJECT_COST = [
    {
      label: '가맹비',
      desc: '상호/상표사용, 경영노하우 전수 상권분석 및 상권보호',
      cost: '300 만원'
    },
    {
      label: '교육비',
      desc: '기술 지원, 운영 교육, 본사 교육 프로그램 진행 및 현장 교육',
      cost: '300 만원'
    },
    {
      label: '주방기기',
      desc: '냉장고, 냉동고, 제면기, 회전식 국솥, 냄비 등',
      cost: '1,200 만원'
    },
    {
      label: '인테리어',
      desc: '실내, 주방, 외관 인테리어',
      cost: '1,500 만원'
    },
  ];

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

  // 7. infoNode -----------------------------------------------------------------------------------
  const infoNode = () => {

    // 1. step
    const stepSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              가맹점 창업 절차
            </Div>
          </Grid>
        </Grid>
      );
      const stepFragment = () => (
        <Grid container={true} spacing={2}>
          {isXxs || isXs ? (
            <Grid size={12}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel={false}
                orientation={"vertical"}
                className={"w-100p"}
              >
                {OBJECT_STEP.map((step: any, index: number) => (
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
                {OBJECT_STEP.slice(0, 4).map((step: any, index: number) => (
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
                {OBJECT_STEP.slice(4).map((step: any, index: number) => (
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
        <Card className={"d-col-center bg-ivory-light border-2 radius-1 shadow-1 p-20"}>
          {titleFragment()}
          <Br px={20} />
          {stepFragment()}
        </Card>
      );
    };

    // 2. cost
    const costSection = () => {
      const titleFragment = () => (
        <Grid container={true} spacing={2}>
          <Grid size={12}>
            <Div className={"fs-1-6rem fw-700"}>
              가맹비 및 창업비용
            </Div>
          </Grid>
        </Grid>
      );
      const headFragment = () => (
        <Grid container={true} spacing={2}>
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
      const costFragment = () => (
        <Grid container={true} spacing={0}>
          {OBJECT_COST.map((item: any, i: number) => (
            <Grid size={12} className={"d-col-center"} key={`list-${i}`}>
              <Grid container={true} spacing={2}>
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
                <Grid size={12}>
                  {i < OBJECT_COST.length - 1 && (
                    <Hr px={20} className={"bg-light-grey"} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center bg-ivory-light border-2 radius-1 shadow-1 p-20"}>
          {titleFragment()}
          <Br px={20} />
          {headFragment()}
          <Hr px={40} className={"bg-burgundy"} />
          {costFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn bg-ivory-light p-20"}>
        {LOADING ? <Loader /> : (
          <>
            {stepSection()}
            <Br px={30} />
            {costSection()}
          </>
        )}
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
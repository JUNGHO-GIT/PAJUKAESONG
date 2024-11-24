// AboutGreeting.tsx

import { useEffect } from "@importReacts";
import { useResponsive, useStoreLoading } from "@importHooks";
import { Div, Img } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const AboutGreeting = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { paperClass } = useResponsive();
  const { setLOADING } = useStoreLoading();

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
  }, []);

  // 7. greetingNode -------------------------------------------------------------------------------
  const greetingNode = () => {
    // 2. greeting
    const greetingSection = () => {
      const greetingFragment = () => (
        <Grid container={true} spacing={3}>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-8rem fw-700"}>
              여러분 반갑습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              <strong>파주개성면옥</strong>은 고객 여러분께 <strong>마음을 담은 건강한 음식</strong>을 전하고자 하는 진심 어린 철학을 바탕으로 모든 음식을 손수 정성껏 준비합니다. <strong>재료 선정부터 요리 과정</strong> 하나하나에 이르기까지, 건강과 맛을 모두 잡기 위한 노력을 기울이고 있습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              <strong>파주개성면옥</strong>은 자연의 순수한 맛을 살리고자 100% 국산 순메밀을 사용하여 고객님들께 더욱 건강한 음식을 제공하고자 합니다. 건강한 식사는 곧 마음의 건강까지 지키는 길이라는 믿음 아래, <strong>늘 최고의 재료만을 엄선</strong>하여 음식을 준비합니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              <strong>파주개성면옥</strong>을 찾아주시는 모든 고객분들은 저희에게 소중한 가족과 같습니다. 그 마음을 담아 저희는 언제나 고객님들의 <strong>건강과 행복</strong>을 최우선으로 생각하며 식사를 준비하고 있습니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-col-left"}>
            <Div className={"fs-1-0rem fw-500"}>
              음식은 단순한 생존을 위한 수단이 아니라, <strong>사람과 사람을 이어주는 소통의 도구</strong>이자, 함께 나누는 기쁨을 배가시키는 중요한 역할을 한다고 믿습니다. 그렇기에 저희는 매일 <strong>한 그릇 한 그릇의 음식에 정성을 쏟고</strong>, 그 안에 담긴 진심이 고객님께 전해지길 간절히 바랍니다.
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-left"}>
            <Div className={"fs-1-5rem fw-500 mr-10px"}>
              대표
            </Div>
            <Div className={"fs-1-5rem fw-700 mr-10px"}>
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
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {greetingFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {greetingSection()}
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
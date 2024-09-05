// UserSignup.tsx

import { useState } from "@imports/ImportReacts";
import { useCommon, useValidateUser } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { USER } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";
import { google } from "@imports/ImportImages";

// -------------------------------------------------------------------------------------------------
export const UserSignup = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId
  } = useCommon();
  const {
    REFS, ERRORS, validate,
  } = useValidateUser();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(USER);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSignup = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/signup`, {
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate("/user/login");
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

  // 7. signupNode ---------------------------------------------------------------------------------
  const signupNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        회원가입
      </Div>
    );
    // 2. signup
    const signupSection = () => {
      const signupFragment = (i: number) => (
        <Grid container spacing={3} key={i}>
          <Grid size={12} className={"d-center"}>
            <Input
              label={"아이디"}
              required={true}
              value={OBJECT.user_id}
              inputRef={REFS.current.user_id}
              error={ERRORS.user_id}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  user_id: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              type={"password"}
              label={"비밀번호"}
              required={true}
              value={OBJECT.user_pw}
              inputRef={REFS.current.user_pw}
              error={ERRORS.user_pw}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  user_pw: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>
      );
      const btnFragment = () => (
        <Grid container spacing={2}>
          <Grid size={12} className={"d-center"}>
            <Btn
              color={"primary"}
              className={"w-100p fs-1-0rem"}
              onClick={() => {
                flowSignup();
              }}
            >
              회원가입
            </Btn>
          </Grid>
          <Grid size={12} className={"d-center"}>
            <Btn
              color={"primary"}
              className={"w-100p fs-1-0rem bg-white black"}
            >
              <Img src={google} className={"w-15 h-15 me-10"} />
              구글 아이디로 로그인
            </Btn>
          </Grid>
        </Grid>
      );
      const linkFragment = () => (
        <Grid container spacing={2}>
          <Grid size={12} className={"d-center"}>
            <Div className={"d-center"}>
              <Div className={"fs-0-8rem"}>
                아이디가 있는 경우
              </Div>
              <Div
                className={"blue pointer fs-0-8rem ms-10"}
                onClick={() => {
                  navigate("/user/login");
                }}
              >
                로그인
              </Div>
            </Div>
          </Grid>
          <Grid size={12} className={"d-center"}>
            <Div className={"d-center"}>
              <Div className={"fs-0-8rem"}>
                비밀번호를 잊은 경우
              </Div>
              <Div
                className={"blue pointer fs-0-8rem ms-10"}
              >
                비밀번호 찾기
              </Div>
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-40 fadeIn"}>
          {signupFragment(0)}
          <Hr px={50} />
          {btnFragment()}
          <Hr px={50} />
          {linkFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper d-center h-min75vh"}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 11, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {signupSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {signupNode()}
    </>
  );
};
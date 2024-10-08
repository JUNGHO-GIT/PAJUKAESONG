// UserSignup.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useValidateUser } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { User } from "@imports/ImportSchemas";
import { Div, Btn, Hr, Br } from "@imports/ImportComponents";
import { Input } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const UserSignup = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    REFS, ERRORS, validate,
  } = useValidateUser();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(User);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSignup = () => {
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
      alert(err.response.data.msg);
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
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              회원가입
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. signup
    const signupSection = () => {
      const signupFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={i}>
          <Grid container spacing={3} columns={12}>
            <Grid size={12} className={"d-center"}>
              <Input
                label={"아이디"}
                required={true}
                value={OBJECT?.user_id}
                inputRef={REFS?.[i]?.user_id}
                error={ERRORS?.[i]?.user_id}
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
                value={OBJECT?.user_pw}
                inputRef={REFS?.[i]?.user_pw}
                error={ERRORS?.[i]?.user_pw}
                onChange={(e: any) => {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    user_pw: e.target.value,
                  }));
                }}
              />
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            {signupFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-10 fadeIn"}>
        <Grid container spacing={2} columns={12}>
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
        </Grid>
      </Card>
    );
    // 4. link
    const linkSection = () => (
      <Card className={"px-10 fadeIn"}>
        <Grid container spacing={2} columns={12}>
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
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min90vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }}>
            {titleSection()}
            <Br px={30} />
            {signupSection()}
            <Br px={30} />
            {btnSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {linkSection()}
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
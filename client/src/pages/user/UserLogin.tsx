// UserLogin.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useValidateUser } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { User } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const UserLogin = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, TITLE, navigate, isAdmin, adminId, adminPw, isUser, userId, userPw,
  } = useCommonValue();
  const {
    REFS, ERRORS, validate,
  } = useValidateUser();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(User);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    // 관리자로 로그인 한 경우
    if (isAdmin && adminId && adminPw) {
      setOBJECT((prev: any) => ({
        ...prev,
        user_id: adminId,
        user_pw: adminPw,
      }));
    }
    // 사용자로 로그인 한 경우
    else if (isUser && userId && userPw) {
      setOBJECT((prev: any) => ({
        ...prev,
        user_id: userId,
        user_pw: userPw,
      }));
    }
  }, [isAdmin, adminId, adminPw, isUser, userId, userPw]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowLogin = () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/login`, {
      user_id: OBJECT?.user_id,
      user_pw: OBJECT?.user_pw,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        if (res.data.admin === "admin") {
          localStorage.clear();
          localStorage.setItem(`${TITLE}_adminId`, OBJECT?.user_id);
          localStorage.setItem(`${TITLE}_adminPw`, OBJECT?.user_pw);
          localStorage.setItem(`${TITLE}_admin`, "true");
        }
        else {
          localStorage.clear();
          localStorage.setItem(`${TITLE}_userId`, OBJECT?.user_id);
          localStorage.setItem(`${TITLE}_userPw`, OBJECT?.user_pw);
          localStorage.setItem(`${TITLE}_user`, "true");
        }
        navigate("/main");
      }
      else {
        alert(res.data.msg);
        localStorage.clear();
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

  // 4. handle ------------------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/main");
  }

  // 7. loginNode ----------------------------------------------------------------------------------
  const loginNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700 fadeIn"}
      >
        로그인
      </Div>
    );
    // 2. login
    const loginSection = (i: number) => (
      <Card className={"border-1 radius p-30 fadeIn"} key={i}>
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Input
              label={"아이디"}
              required={true}
              value={OBJECT?.user_id}
              inputRef={REFS?.[i]?.user_id}
              error={ERRORS?.[i]?.user_id}
              disabled={isAdmin || isUser}
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
              disabled={isAdmin || isUser}
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
    // 3. btn
    const btnSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            {(isAdmin || isUser) ? (
              <Btn
                className={"w-100p bg-burgundy fs-1-0rem"}
                onClick={() => {
                  handleLogout();
                }}
              >
                로그아웃
              </Btn>
            ) : (
              <Btn
                color={"primary"}
                className={"w-100p bg-primary fs-1-0rem"}
                onClick={() => {
                  flowLogin();
                }}
              >
                로그인
              </Btn>
            )}
          </Grid>
        </Grid>
      </Card>
    );
    // 4. link
    const linkSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"d-center"}>
              <Div className={"fs-0-8rem"}>
                아이디가 없는 경우
              </Div>
              <Div
                className={"blue pointer fs-0-8rem ms-10"}
              >
                회원가입
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {loginSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {btnSection(0)}
          </Grid>
          <Hr px={10} h={1} w={90} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {linkSection(0)}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {loginNode()}
    </>
  );
};
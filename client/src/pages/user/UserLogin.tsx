// UserLogin.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateUser } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { User } from "@imports/ImportSchemas";
import { Input } from "@imports/ImportContainers";
import { Div, Btn, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const UserLogin = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, TITLE, navigate, isAdmin, adminId, adminPw, isUser, userId, userPw, } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateUser();
  const { ALERT, setALERT } = useAlertStore();

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
  const flowLogin = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "login")) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/login`, {
      user_id: OBJECT?.user_id,
      user_pw: OBJECT?.user_pw,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
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
        setALERT({
          open: !ALERT.open,
          severity: "error",
          msg: res.data.msg,
        });
        localStorage.clear();
      }
    })
    .catch((err: any) => {
      setALERT({
        open: !ALERT.open,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  };

  // 4. handle ------------------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    navigate("/main");
  }

  // 7. loginNode ----------------------------------------------------------------------------------
  const loginNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
            <Div className={"fs-2-0rem fw-700"}>
              로그인
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. login
    const loginSection = () => {
      const loginFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-20"} key={`login-${i}`}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Input
                variant={"outlined"}
                required={true}
                label={"아이디"}
                helperText={"이메일 형식으로 입력해주세요."}
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
                variant={"outlined"}
                required={true}
                type={"password"}
                label={"비밀번호"}
                helperText={"영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."}
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
      return (
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
            {loginFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
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
    const linkSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-0-8rem"}>
              아이디가 없는 경우
            </Div>
            <Div
              className={"blue pointer fs-0-8rem ms-10"}
            >
              회원가입
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-0-8rem"}>
              비밀번호를 잊은 경우
            </Div>
            <Div
              className={"blue pointer fs-0-8rem ms-10"}
            >
              비밀번호 찾기
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {loginSection()}
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
      {loginNode()}
    </>
  );
};
// UserLogin.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateUser } from "@imports/ImportValidates";
import { axios, insertComma, setLocal } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { User } from "@imports/ImportSchemas";
import { Input } from "@imports/ImportContainers";
import { Div, Btn, Hr, Br } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const UserLogin = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate } = useCommonValue();
  const { isAdmin, adminId, adminPw, isUser, userId, userPw } = useCommonValue();
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
          setLocal("setting", "id", "", {
            adminId: OBJECT?.user_id,
            adminPw: OBJECT?.user_pw,
            admin: "true",
            user: "false",
          });
        }
        else {
          setLocal("setting", "id", "", {
            userId: OBJECT?.user_id,
            userPw: OBJECT?.user_pw,
            admin: "false",
            user: "true",
          });
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
    // 2. login
    const loginSection = () => {
      const loginFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12}>
            <Input
              required={true}
              label={"아이디"}
              helperText={"이메일 형식으로 입력해주세요."}
              value={item?.user_id}
              inputRef={REFS?.[i]?.user_id}
              error={ERRORS?.[i]?.user_id}
              disabled={isAdmin || isUser}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value === "" ? "" : e.target.value;
                // 30자 제한
                if (value.length > 30) {
                  return;
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  user_id: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              required={true}
              type={"password"}
              label={"비밀번호"}
              helperText={"영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."}
              value={item?.user_pw}
              inputRef={REFS?.[i]?.user_pw}
              error={ERRORS?.[i]?.user_pw}
              disabled={isAdmin || isUser}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value === "" ? "" : e.target.value;
                // 30자 제한
                if (value.length > 30) {
                  return;
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  user_pw: value,
                }));
              }}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} key={`login-${0}`}>
            {loginFragment(OBJECT, 0)}
          </Grid>
        </Grid>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={12}>
          {(isAdmin || isUser) ? (
            <Btn
              className={"w-100p bg-light-black fs-1-0rem"}
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </Btn>
          ) : (
            <Btn
              className={"w-100p bg-light-black fs-1-0rem"}
              onClick={() => {
                flowLogin();
              }}
            >
              로그인
            </Btn>
          )}
        </Grid>
      </Grid>
    );
    // 4. link
    const linkSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
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
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : loginSection()}
            <Br px={30} />
            {btnSection()}
            <Hr px={40} className={"bg-grey"} />
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
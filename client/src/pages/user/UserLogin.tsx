// UserLogin.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert } from "@importHooks";
import { useResponsive, useValidateUser } from "@importHooks";
import { axios } from "@importLibs";
import { setLocal } from "@importScripts";
import { User } from "@importSchemas";
import { Loader } from "@importLayouts";
import { Input } from "@importContainers";
import { Div, Btn, Hr, Br } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const UserLogin = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate } = useCommonValue();
  const { isAdmin, adminId, adminPw, isUser, userId, userPw } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateUser();
  const { ALERT, setALERT } = useStoreAlert();

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
      setTimeout(() => {
        setLOADING(false);
      }, 100);
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
      const loginFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={3} key={`login-${i}`}>
              <Grid container={true} spacing={0}>
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
              </Grid>
              <Grid container={true} spacing={0}>
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
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"border-1 radius-1 shadow-1 p-20"}>
          {loginFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
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
      <Grid container={true} spacing={2} className={"px-10"}>
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
      <Paper className={`${paperClass}`}>
        {LOADING ? <Loader /> : (
          <>
            {loginSection()}
            <Br px={30} />
            {filterSection()}
            <Hr px={40} className={"bg-grey"} />
            {linkSection()}
          </>
        )}
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
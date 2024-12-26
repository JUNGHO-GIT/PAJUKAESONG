// UserLogin.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateUser } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { axios } from "@importLibs";
import { setLocal } from "@importScripts";
import { User } from "@importSchemas";
import { Input } from "@importContainers";
import { Div, Btn, Hr, Br, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const UserLogin = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate } = useCommonValue();
  const { isAdmin, adminId, adminPw, isUser, userId, userPw } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateUser();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(User);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

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
          open: true,
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
        setLOADING(false);
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
        localStorage.clear();
      }
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
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
        <Card className={"border-1 radius-2 shadow-1 p-20px"}>
          {loginFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
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
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={12} className={"d-row-center"}>
          <Div className={"fs-0-8rem"}>
            아이디가 없는 경우
          </Div>
          <Div
            className={"blue pointer fs-0-8rem ml-10px"}
          >
            회원가입
          </Div>
        </Grid>
        <Grid size={12} className={"d-row-center"}>
          <Div className={"fs-0-8rem"}>
            비밀번호를 잊은 경우
          </Div>
          <Div
            className={"blue pointer fs-0-8rem ml-10px"}
          >
            비밀번호 찾기
          </Div>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {loginSection()}
        <Br m={30} />
        {filterSection()}
        <Hr m={60} className={"bg-light h-2px"} />
        {linkSection()}
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
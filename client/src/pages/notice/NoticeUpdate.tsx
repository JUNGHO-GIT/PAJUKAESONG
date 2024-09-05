// NoticeUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useValidateNotice } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { NOTICE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId, location_id
  } = useCommon();
  const {
    REFS, ERRORS, validate,
  } = useValidateNotice();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(NOTICE);
  const [STATE, setSTATE] = useState<any>({
    _id: location_id
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: STATE._id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result);
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`, {
      user_id: adminId,
      _id: STATE._id,
      OBJECT: OBJECT,
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate("/notice/list");
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        공지사항 수정
      </Div>
    );
    // 2. update
    const updateSection = () => {
      const updateFragment = () => (
        <Grid container spacing={3} className={"text-left"}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"공지사항 제목"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.notice_title}
              inputRef={REFS?.current?.notice_title}
              error={ERRORS?.notice_title}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_title: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              required={true}
              label={"공지사항 내용"}
              inputclass={"h-35vh"}
              value={OBJECT.notice_content}
              itemRef={REFS?.current?.notice_content}
              error={ERRORS?.notice_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_content: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              label={"작성일"}
              className={"border-bottom"}
              disabled={true}
              value={moment(OBJECT.regDt).format("YYYY-MM-DD")}
            />
          </Grid>
        </Grid>
      );
      const btnFragment = () => (
        <Grid container spacing={2}>
          <Grid size={12}>
            <Btn
              size={"large"}
              className={"w-50p fs-1-2rem bg-burgundy"}
              onClick={() => {
                flowSave();
              }}
            >
              수정하기
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-40 fadeIn"}>
          {updateFragment()}
          <Br px={50} />
          {btnFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 11, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {updateSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {saveNode()}
    </>
  );
};
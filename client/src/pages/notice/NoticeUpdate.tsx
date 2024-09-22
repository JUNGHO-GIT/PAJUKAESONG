// NoticeUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios, moment } from "@imports/ImportLibs";
import { Notice } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Input, TextArea, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, adminId, location_id
  } = useCommonValue();
  const {
    REFS, ERRORS, validate,
  } = useValidateNotice();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
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
      setOBJECT(res.data.result || Notice);
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`, {
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
      alert(err.response.data.msg);
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
      const updateFragment = (i: number) => (
        <Grid container spacing={3} className={"text-left"}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"공지사항 제목"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.notice_title}
              inputRef={REFS[i]?.notice_title}
              error={ERRORS[i]?.notice_title}
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
              itemRef={REFS[i]?.notice_content}
              error={ERRORS[i]?.notice_content}
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
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
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
        <Card className={"border radius shadow p-30 fadeIn"}>
          {updateFragment(0)}
          <Br px={50} />
          {btnFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
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
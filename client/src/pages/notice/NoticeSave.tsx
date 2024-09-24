// NoticeSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Br, Input, TextArea, Btn, FileInput } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    dayFmt,
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateNotice();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT, fileList)) {
      setLOADING(false);
      return;
    }
    axios.post(`${URL}${SUBFIX}/save`,
      makeFormData(
        OBJECT,
        fileList
      ),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        document?.querySelector("input[type=file]")?.remove();
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
        className={"fs-2-0rem fw-700 fadeIn"}
      >
        공지사항 저장
      </Div>
    );
    // 2. save
    const saveSection = (i: number) => (
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              label={"작성일"}
              className={"border-bottom-1"}
              disabled={true}
              value={dayFmt}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"공지사항 제목"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT?.notice_title}
              inputRef={REFS?.[i]?.notice_title}
              error={ERRORS?.[i]?.notice_title}
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
              value={OBJECT?.notice_content}
              itemRef={REFS?.[i]?.notice_content}
              error={ERRORS?.[i]?.notice_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_content: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <FileInput
              variant={"outlined"}
              label={"공지사항 이미지"}
              required={true}
              limit={1}
              existing={OBJECT?.notice_images}
              group={"notice"}
              value={fileList}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
              handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_images: updatedExistingFiles,
                }));
              }}
            />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-10 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-right"}>
            <Btn
              className={"w-70p fs-1-0rem bg-light black"}
              onClick={() => {
                navigate(`/notice/list`);
              }}
            >
              목록으로
            </Btn>
          </Grid>
          <Grid size={6} className={"d-left"}>
            <Btn
              className={"w-70p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave()
              }}
            >
              저장하기
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : saveSection(0)}
          </Grid>
          <Br px={5} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection(0)}
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
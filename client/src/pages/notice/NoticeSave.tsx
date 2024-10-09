// NoticeSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios, makeFormData } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input, TextArea, InputFile } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { REFS, ERRORS, validate } = useValidateNotice();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT, fileList, "save")) {
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
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
        document?.querySelector("input[type=file]")?.remove();
        navigate("/notice/list");
      }
      else {
        setALERT({
          open: !ALERT.open,
          severity: "error",
          msg: res.data.msg,
        });
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              공지사항 저장
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. save
    const saveSection = () => {
      const saveFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={`save-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"공지사항 제목"}
                required={true}
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
            <Grid size={12} className={"d-column-center"}>
              <TextArea
                label={"공지사항 내용"}
                variant={"outlined"}
                required={true}
                value={OBJECT?.notice_content}
                itemRef={REFS?.[i]?.notice_content}
                error={ERRORS?.[i]?.notice_content}
                inputclass={"h-35vh border-none"}
                onChange={(e: any) => {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    notice_content: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid size={12} className={"d-column-center"}>
              <InputFile
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
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            {saveFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-row-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-grey"}
              onClick={() => {
                navigate(`/notice/list`);
              }}
            >
              목록으로
            </Btn>
          </Grid>
          <Grid size={6} className={"d-row-left"}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
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
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {saveSection()}
            <Br px={30} />
            {btnSection()}
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
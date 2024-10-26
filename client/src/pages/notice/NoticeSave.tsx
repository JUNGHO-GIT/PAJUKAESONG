// NoticeSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios, insertComma, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input, TextArea, InputFile } from "@imports/ImportContainers";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateNotice();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, fileList, "save")) {
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
    // 2. save
    const saveSection = () => {
      const saveFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Input
              label={"공지사항 제목"}
              required={true}
              value={item?.notice_title}
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
              label={"공지사항 내용"}
              required={true}
              value={item?.notice_content}
              itemRef={REFS?.[i]?.notice_content}
              error={ERRORS?.[i]?.notice_content}
              inputclass={"h-min50vh border-none"}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_content: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              label={"공지사항 이미지"}
              required={true}
              limit={1}
              existing={item?.notice_images}
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
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`save-${0}`}>
            {saveFragment(OBJECT, 0)}
          </Grid>
        </Grid>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate(`/notice/list`);
            }}
          >
            목록으로
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowSave()
            }}
          >
            저장하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : saveSection()}
            <Br px={20} />
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
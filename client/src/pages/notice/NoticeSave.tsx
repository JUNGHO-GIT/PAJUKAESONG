// NoticeSave.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateNotice } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm } from "@importScripts";
import { Notice } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input, TextArea, InputFile } from "@importContainers";
import { Br, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const NoticeSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateNotice();
  const { paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
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
      makeForm(
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
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
        document?.querySelector("input[type=file]")?.remove();
        navigate("/notice/list");
      }
      else {
        setLOADING(false);
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 2. save
    const saveSection = () => {
      const saveFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={3} key={`save-${i}`}>
              <Grid container={true} spacing={0}>
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
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <TextArea
                    label={"공지사항 내용"}
                    required={true}
                    value={item?.notice_content}
                    itemRef={REFS?.[i]?.notice_content}
                    error={ERRORS?.[i]?.notice_content}
                    inputclass={"h-min-50vh border-none"}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        notice_content: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <InputFile
                    required={true}
                    limit={1}
                    label={"공지사항 이미지"}
                    group={"notice"}
                    value={fileList}
                    existing={item?.notice_images}
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
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {saveFragment()}
        </Card>
      );
    };
    // 4. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={null}
        setPAGING={null}
        COUNT={null}
        flow={{
          flowSave
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {saveSection()}
        <Br m={20} />
        {filterSection()}
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
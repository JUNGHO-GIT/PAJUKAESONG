// NoticeUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateNotice } from "@imports/ImportValidates";
import { axios, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Btn, Br } from "@imports/ImportComponents";
import { Input, TextArea, InputFile } from "@imports/ImportContainers";
import { Paper, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateNotice();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Notice);
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
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowUpdate = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, fileList, "update")) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`,
      makeFormData( OBJECT, fileList, { _id: location_id } ),
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

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 1. update
    const updateSection = () => {
      const updateFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Input
              variant={"outlined"}
              label={"공지사항 제목"}
              required={true}
              value={item?.notice_title}
              inputRef={REFS?.[i]?.notice_title}
              error={ERRORS?.[i]?.notice_title}
              onChange={(e: any) => {
                const value = e.target.value;
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_title: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              label={"공지사항 내용"}
              variant={"outlined"}
              required={true}
              value={item?.notice_content}
              itemRef={REFS?.[i]?.notice_content}
              error={ERRORS?.[i]?.notice_content}
              inputclass={"h-min50vh border-none"}
              onChange={(e: any) => {
                const value = e.target.value;
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_content: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              variant={"outlined"}
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
          <Grid size={12} className={"d-col-center"} key={`update-${0}`}>
            {updateFragment(OBJECT, 0)}
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
              flowUpdate()
            }}
          >
            수정하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : updateSection()}
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
      {updateNode()}
    </>
  );
};
// NoticeUpdate.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert, useValidateNotice } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm } from "@importScripts";
import { Notice } from "@importSchemas";
import { Loader } from "@importLayouts";
import { Input, TextArea, InputFile } from "@importContainers";
import { Btn, Br } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateNotice();
  const { ALERT, setALERT } = useStoreAlert();

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
      makeForm( OBJECT, fileList, { _id: location_id } ),
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
        <Grid container={true} spacing={3} key={`update-${i}`}>
          <Grid size={12} className={"mt-10"}>
            <Input
              required={true}
              label={"공지사항 제목"}
              value={item?.notice_title}
              inputRef={REFS?.[i]?.notice_title}
              error={ERRORS?.[i]?.notice_title}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value || "";
                // 100자 제한
                if (value.length > 100) {
                  return;
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_title: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              required={true}
              label={"공지사항 내용"}
              value={item?.notice_content}
              itemRef={REFS?.[i]?.notice_content}
              error={ERRORS?.[i]?.notice_content}
              inputclass={"h-min50vh border-none"}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value || "";
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  notice_content: value,
                }));
              }}
            />
          </Grid>
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
      );
      return (
        <Card className={"d-col-center border-2 radius-1 shadow-1 p-20"}>
          {updateFragment(OBJECT, 0)}
        </Card>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
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
      <Paper className={"content-wrapper fadeIn p-20"}>
        {LOADING ? <Loader /> : (
          <>
            {updateSection()}
            <Br px={20} />
            {btnSection()}
          </>
        )}
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
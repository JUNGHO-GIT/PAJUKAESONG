// ContactUpdate.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive } from "@importHooks";
import { useStoreAlert, useStoreLoading, useValidateContact } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm } from "@importScripts";
import { Contact } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Select, Input, TextArea, InputFile } from "@importContainers";
import { Br, Paper, Grid, Card } from "@importComponents";
import { MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const ContactUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateContact();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 1. common -------------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Contact);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      },
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Contact);
    })
    .catch((err: any) => {
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
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
        document?.querySelector("input[type=file]")?.remove();
        navigate("/contact/find");
      }
      else {
        setALERT({
          open: true,
          severity: "error",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setALERT({
        open: true,
        severity: "error",
        msg: err.response.data.msg,
      });
      console.error(err);
    });
  };

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 2. update
    const updateSection = () => {
      const updateFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={3} key={`update-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"mt-10"}>
                  <Select
                    label={"문의 유형"}
                    required={true}
                    value={item?.contact_category}
                    inputRef={REFS?.[i]?.contact_category}
                    error={ERRORS?.[i]?.contact_category}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_category: e.target.value,
                      }));
                    }}
                  >
                    {["franchise", "personal"].map((category: string, idx: number) => (
                      <MenuItem
                        key={idx}
                        value={category}
                        className={"fs-0-8rem"}
                      >
                        {category === "franchise" && "가맹 문의"}
                        {category === "personal" && "1:1 문의"}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"이름"}
                    required={true}
                    value={item?.contact_name}
                    inputRef={REFS?.[i]?.contact_name}
                    error={ERRORS?.[i]?.contact_name}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_name: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"이메일"}
                    required={true}
                    value={item?.contact_email}
                    inputRef={REFS?.[i]?.contact_email}
                    error={ERRORS?.[i]?.contact_email}
                    placeholder={"abcd@naver.com"}
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
                        contact_email: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"전화번호"}
                    required={true}
                    value={item?.contact_phone}
                    inputRef={REFS?.[i]?.contact_phone}
                    error={ERRORS?.[i]?.contact_phone}
                    placeholder={"010-1234-5678"}
                    onChange={(e: any) => {
                      // 빈값 처리
                      let value = e.target.value === "" ? "" : e.target.value.replace(/[^0-9]/g, "")
                      // 11자 제한 + 정수
                      if (value.length > 11 || !/^\d+$/.test(value)) {
                        return;
                      }
                      // 010-1234-5678 형식으로 변경
                      if (7 <= value.length && value.length < 12) {
                        value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
                      }
                      else if (4 <= value.length && value.length < 7) {
                        value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                      }
                      else if (0 <= value.length && value.length < 4) {
                        value = value.replace(/(\d{0,3})/, "$1");
                      }
                      // object 설정
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_phone: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"문의 제목"}
                    required={true}
                    value={item?.contact_title}
                    inputRef={REFS?.[i]?.contact_title}
                    error={ERRORS?.[i]?.contact_title}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_title: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <TextArea
                    label={"문의 내용"}
                    required={true}
                    inputclass={"h-50vh"}
                    value={item?.contact_content}
                    inputRef={REFS?.[i]?.contact_content}
                    error={ERRORS?.[i]?.contact_content}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_content: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <InputFile
                    label={"문의 이미지"}
                    required={true}
                    limit={1}
                    existing={item?.contact_images}
                    group={"contact"}
                    value={fileList}
                    onChange={(updatedFiles: File[] | null) => {
                      setFileList(updatedFiles);
                    }}
                    handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        contact_images: updatedExistingFiles,
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
          {updateFragment()}
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
          flowUpdate
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {updateSection()}
        <Br m={20} />
        {filterSection()}
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
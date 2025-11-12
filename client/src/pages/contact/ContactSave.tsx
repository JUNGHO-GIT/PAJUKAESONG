// ContactSave.tsx

import { useState, useEffect, memo } from "@exportReacts";
import { useCommonValue, useResponsive, useValidateContact } from "@exportHooks";
import { useStoreAlert, useStoreLoading } from "@exportStores";
import { axios } from "@exportLibs";
import { makeForm } from "@exportScripts";
import { Contact } from "@exportSchemas";
import { Filter } from "@exportLayouts";
import { Select, Input, TextArea, InputFile } from "@exportContainers";
import { Br, Paper, Grid, Card } from "@exportComponents";
import { MenuItem } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactSave = memo(() => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
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
    setTimeout(() => {
      setLOADING(false);
    }, 500);
  }, []);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    const isValid = await validate(OBJECT, fileList, "save");
    if (!isValid) {
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
      res.data.status === "success" ? (
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        }),
        document?.querySelector("input[type=file]")?.remove(),
        navigate("/contact/find")
      ) : (
        setLOADING(false),
        setALERT({
          open: true,
          severity: "error",
          msg: res.data.msg,
        })
      );
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
                    required={true}
                    label={"이메일"}
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
                      let value = e.target.value === "" ? "" : e.target.value.replace(/[^0-9]/g, "");
                      // 11자 제한 + 정수
                      if (value.length > 11 || !/^\d+$/.test(value)) {
                        return;
                      }
                      // 전화번호 형식 변경
                      value = (7 <= value.length && value.length < 12) ? value.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3") :
                              (4 <= value.length && value.length < 7) ? value.replace(/(\d{3})(\d{1,4})/, "$1-$2") :
                              (0 <= value.length && value.length < 4) ? value.replace(/(\d{0,3})/, "$1") : value;
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
});
// FranchiseSave.tsx

import { useState, useEffect, memo } from "@importReacts";
import { useCommonValue, useResponsive, useValidateFranchise } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { axios } from "@importLibs";
import { makeForm } from "@importScripts";
import { Franchise } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input, InputFile, Select } from "@importContainers";
import { Br, Paper, Grid, Card } from "@importComponents";
import { MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseSave = memo(() => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateFranchise();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Franchise);
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
        navigate("/franchise/list");
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

  // 4. handle ------------------------------------------------------------------------------------
  const handleMap = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress: string = data.address;
        let extraAddress: string = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setOBJECT((prev: any) => ({
          ...prev,
          franchise_address_main: data.address,
        }));
      },
    }).open();
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
                    required={true}
                    label={"순서"}
                    value={item?.franchise_seq || 0}
                    inputRef={REFS?.[i]?.franchise_seq}
                    error={ERRORS?.[i]?.franchise_seq}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        franchise_seq: e.target.value,
                      }));
                    }}
                  >
                    {Array.from({ length: 30 }, (_, i) => i).map((seq: number, idx: number) => (
                      <MenuItem
                        key={idx}
                        value={seq}
                        className={"fs-0-8rem"}
                      >
                        {seq}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    label={"가맹점 이름"}
                    value={item?.franchise_name}
                    inputRef={REFS?.[i]?.franchise_name}
                    error={ERRORS?.[i]?.franchise_name}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        franchise_name: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    readOnly={true}
                    label={"가맹점 주소"}
                    className={"pointer"}
                    value={item?.franchise_address_main}
                    inputRef={REFS?.[i]?.franchise_address_main}
                    error={ERRORS?.[i]?.franchise_address_main}
                    onClick={() => {
                      handleMap();
                    }}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        franchise_address_main: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    label={"상세주소"}
                    value={item?.franchise_address_detail}
                    inputRef={REFS?.[i]?.franchise_address_detail}
                    error={ERRORS?.[i]?.franchise_address_detail}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        franchise_address_detail: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    label={"가맹점 전화번호"}
                    value={item?.franchise_phone}
                    inputRef={REFS?.[i]?.franchise_phone}
                    error={ERRORS?.[i]?.franchise_phone}
                    placeholder={"031-124-5678"}
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
                        franchise_phone: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <InputFile
                    label={"가맹점 이미지"}
                    required={true}
                    limit={3}
                    existing={item?.franchise_images}
                    group={"franchise"}
                    value={fileList}
                    inputRef={REFS?.[i]?.franchise_images}
                    error={ERRORS?.[i]?.franchise_images}
                    onChange={(updatedFiles: File[] | null) => {
                      setFileList(updatedFiles);
                    }}
                    handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        franchise_images: updatedExistingFiles,
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
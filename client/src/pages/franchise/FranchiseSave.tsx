// FranchiseSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateFranchise } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Btn } from "@imports/ImportComponents";
import { Input, InputFile } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    dayFmt
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateFranchise();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Franchise);
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
        navigate("/franchise/list");
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
    // 1. title
    const titleSection = () => (
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        가맹점 등록
      </Div>
    );
    // 2. save
    const saveSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius-1 p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 이름"}
              required={true}
              value={OBJECT?.franchise_name}
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
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 주소"}
              required={true}
              readOnly={true}
              className={"pointer"}
              value={OBJECT?.franchise_address_main}
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
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"상세주소"}
              required={true}
              value={OBJECT?.franchise_address_detail}
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
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 전화번호"}
              required={true}
              value={OBJECT?.franchise_phone}
              inputRef={REFS?.[i]?.franchise_phone}
              error={ERRORS?.[i]?.franchise_phone}
              placeholder={"010-1234-5678"}
              onChange={(e: any) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                const newValue = value.replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3');
                if (value.length > 11) {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    franchise_phone: prev.franchise_phone,
                  }));
                }
                else {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    franchise_phone: newValue,
                  }));
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              disabled={true}
              label={"작성일"}
              value={dayFmt}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              variant={"outlined"}
              label={"가맹점 이미지"}
              required={true}
              limit={1}
              existing={OBJECT?.franchise_images}
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
      </Card>
    );
    // 3. btn
    const btnSection = (i: number) => (
      <Card className={"fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-row-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-grey"}
              onClick={() => {
                navigate(`/franchise/list`);
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {saveSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {btnSection(0)}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : saveNode()}
    </>
  );
};
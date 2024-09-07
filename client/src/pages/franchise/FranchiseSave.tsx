// FranchiseSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useValidateFranchise } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { FRANCHISE } from "@imports/ImportBases";
import { Div, Img, Hr, Br, Input, FileInput, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, koreanDate, URL, SUBFIX, adminId
  } = useCommon();
  const {
    REFS, ERRORS, validate,
  } = useValidateFranchise();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [mapAddress, setMapAddress] = useState<string>("");
  const [OBJECT, setOBJECT] = useState<any>(FRANCHISE);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    const formData = new FormData(OBJECT)
    await axios.post(`${URL}${SUBFIX}/save`, {
      formData
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate("/franchise/list");
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch((err: any) => {
      alert("오류가 발생했습니다.");
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
        setMapAddress(fullAddress);
      },
    }).open();
  };

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        가맹점 등록
      </Div>
    );
    // 2. save
    const saveSection = () => {
      const saveFragment = () => (
        <Grid container spacing={3} className={"text-left"}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 이름"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.franchise_name}
              inputRef={REFS?.current?.franchise_name}
              error={ERRORS?.franchise_name}
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
              className={"border-bottom pointer"}
              value={OBJECT.franchise_address_main}
              inputRef={REFS?.current?.franchise_address_main}
              error={ERRORS?.franchise_address_main}
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
              className={"border-bottom"}
              value={OBJECT.franchise_address_detail}
              inputRef={REFS?.current?.franchise_address_detail}
              error={ERRORS?.franchise_address_detail}
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
              className={"border-bottom"}
              value={OBJECT.franchise_phone}
              inputRef={REFS?.current?.franchise_phone}
              error={ERRORS?.franchise_phone}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_phone: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              required={true}
              label={"작성일"}
              shrink={"shrink"}
              className={"border-bottom"}
              readOnly={true}
              value={koreanDate}
            />
          </Grid>
          <Grid size={12}>
            <FileInput
              variant={"outlined"}
              label={"가맹점 사진"}
              required={true}
              value={OBJECT.franchise_image}
              inputRef={REFS?.current?.franchise_image}
              error={ERRORS?.franchise_image}
              onChange={(updatedFiles: File[] | null) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_image: updatedFiles,
                }));
              }}
            />
          </Grid>
        </Grid>
      );
      const btnFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Btn
              className={"w-100p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave();
              }}
            >
              저장하기
            </Btn>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"border radius shadow p-30 fadeIn"}>
          {saveFragment()}
          <Br px={50} />
          {btnFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {saveSection()}
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
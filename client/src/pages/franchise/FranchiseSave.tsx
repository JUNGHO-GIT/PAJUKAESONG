// FranchiseSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateFranchise } from "@imports/ImportValidates";
import { axios, makeFormData } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input, InputFile } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { REFS, ERRORS, validate } = useValidateFranchise();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Franchise);
  const [fileList, setFileList] = useState<File[] | null>(null);

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
        navigate("/franchise/list");
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
      <Card className={"p-0"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={12}>
            <Div className={"fs-2-0rem fw-700"}>
              가맹점 등록
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. save
    const saveSection = () => {
      const saveFragment = (item: any, i: number) => (
        <Card className={"p-0"}>
          <Grid container spacing={1} columns={12}>
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"가맹점 이름"}
                required={true}
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
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"가맹점 주소"}
                required={true}
                readOnly={true}
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
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"상세주소"}
                required={true}
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
            <Grid size={12}>
              <Input
                variant={"outlined"}
                label={"가맹점 전화번호"}
                required={true}
                value={item?.franchise_phone}
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
              <InputFile
                variant={"outlined"}
                label={"가맹점 이미지"}
                required={true}
                limit={1}
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
        </Card>
      );
      return (
        <Card className={"border-1 shadow-1 radius-1 p-20"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              className={"d-column-center"}
              key={`save-${0}`}
            >
              {saveFragment(OBJECT, 0)}
            </Grid>
          </Grid>
        </Card>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={1} columns={12}>
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
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={1} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={20} />
            {LOADING ? <Loading /> : saveSection()}
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
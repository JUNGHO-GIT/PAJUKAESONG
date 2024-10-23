// FranchiseSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateFranchise } from "@imports/ImportValidates";
import { axios, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Btn, Br } from "@imports/ImportComponents";
import { Input, InputFile, Select } from "@imports/ImportContainers";
import { Paper, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateFranchise();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
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
    // 2. save
    const saveSection = () => {
      const saveFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Select
              variant={"outlined"}
              label={"순서"}
              required={true}
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
                <MenuItem key={idx} value={seq} className={"fs-0-8rem"}>
                  {seq}
                </MenuItem>
              ))}
            </Select>
          </Grid>
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
              placeholder={"031-124-5678"}
              onChange={(e: any) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                const newValue = value.replace(/(\d{3})(\d{1,3})(\d{1,4})/, '$1-$2-$3');
                if (value.length > 10) {
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
              navigate(`/franchise/list`);
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
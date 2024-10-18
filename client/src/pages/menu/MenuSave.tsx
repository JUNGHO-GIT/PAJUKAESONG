// MenuSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateMenu } from "@imports/ImportValidates";
import { axios, numeral, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input, Select, InputFile } from "@imports/ImportContainers";
import { Paper, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateMenu();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Menu);
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
        navigate(`/menu/list`, {
          state: {
            category: OBJECT?.menu_category,
          },
        });
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 2. save
    const saveSection = () => {
      const saveFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Select
              variant={"outlined"}
              label={"카테고리"}
              required={true}
              value={item?.menu_category}
              inputRef={REFS?.[i]?.menu_category}
              error={ERRORS?.[i]?.menu_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_category: e.target.value,
                }));
              }}
            >
              {["main", "side"].map((category: string, idx: number) => (
                <MenuItem key={idx} value={category} className={"fs-0-8rem"}>
                  {category === "main" && "메인 메뉴"}
                  {category === "side" && "사이드 메뉴"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Select
              variant={"outlined"}
              label={"순서"}
              required={true}
              value={item?.menu_seq || 0}
              inputRef={REFS?.[i]?.menu_seq}
              error={ERRORS?.[i]?.menu_seq}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_seq: e.target.value,
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
              label={"메뉴 이름"}
              required={true}
              value={item?.menu_name}
              inputRef={REFS?.[i]?.menu_name}
              error={ERRORS?.[i]?.menu_name}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              label={"메뉴 설명"}
              required={true}
              value={item?.menu_description}
              inputRef={REFS?.[i]?.menu_description}
              error={ERRORS?.[i]?.menu_description}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_description: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              required={true}
              label={"가격"}
              value={numeral(item?.menu_price).format("0,0")}
              inputRef={REFS?.[i]?.menu_price}
              error={ERRORS?.[i]?.menu_price}
              onChange={(e: any) => {
                const value = e.target.value.replace(/,/g, '');
                const newValue = value === "" ? 0 : Number(value);
                if (value === "") {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    menu_price: "0",
                  }));
                }
                else if (!isNaN(newValue) && newValue <= 9999999999) {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    menu_price: String(newValue),
                  }));
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              variant={"outlined"}
              label={"메뉴 이미지"}
              required={true}
              limit={1}
              existing={item?.menu_images}
              group={"menu"}
              value={fileList}
              inputRef={REFS?.[i]?.menu_images}
              error={ERRORS?.[i]?.menu_images}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
              handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_images: updatedExistingFiles,
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
              navigate(`/menu/list`, {
                state: {
                  category: OBJECT?.menu_category,
                },
              });
            }}
          >
            목록으로
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowSave();
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
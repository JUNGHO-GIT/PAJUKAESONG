// MenuSave.tsx

import { useState } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateMenu } from "@imports/ImportValidates";
import { axios, numeral } from "@imports/ImportUtils";
import { makeFormData } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Btn } from "@imports/ImportComponents";
import { Input, Select, InputFile } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX
  } = useCommonValue();
  const {
    dayFmt
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateMenu();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Menu);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT, fileList, "save")) {
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
        navigate(`/menu/list`, {
          state: {
            category: OBJECT?.menu_category,
          },
        });
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        메뉴 등록
      </Div>
    );
    // 2. save
    const saveSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius-1 p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"메뉴 카테고리"}
              required={true}
              value={OBJECT?.menu_category}
              inputRef={REFS?.[i]?.menu_category}
              error={ERRORS?.[i]?.menu_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_category: e.target.value,
                }));
              }}
            >
              {["main", "side"].map((item: string, idx: number) => (
                <MenuItem key={idx} value={item} className={"fs-0-8rem"}>
                  {item === "main" && "메인 메뉴"}
                  {item === "side" && "사이드 메뉴"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"메뉴 이름"}
              required={true}
              value={OBJECT?.menu_name}
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
              variant={"standard"}
              label={"메뉴 설명"}
              required={true}
              value={OBJECT?.menu_description}
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
              variant={"standard"}
              required={true}
              label={"가격"}
              value={numeral(OBJECT?.menu_price).format("0,0")}
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
              label={"메뉴 이미지"}
              required={true}
              limit={1}
              existing={OBJECT?.menu_images}
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
          <Grid size={6} className={"d-row-left"}>
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
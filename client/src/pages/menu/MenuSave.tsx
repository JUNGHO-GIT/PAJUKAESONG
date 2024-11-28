// MenuSave.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useValidateMenu } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm, insertComma } from "@importScripts";
import { Menu } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Input, Select, InputFile } from "@importContainers";
import { Br, Paper, Grid, Card } from "@importComponents";
import { MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const MenuSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateMenu();
  const { paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
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
        navigate(`/menu/list`, {
          state: {
            category: OBJECT?.menu_category,
          },
        });
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
                    label={"카테고리"}
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
                      <MenuItem
                        key={idx}
                        value={category}
                        className={"fs-0-8rem"}
                      >
                        {category === "main" && "메인 메뉴"}
                        {category === "side" && "사이드 메뉴"}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Select
                    required={true}
                    label={"메뉴 순서"}
                    value={item?.menu_seq || 1}
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
                    label={"메뉴 이름"}
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
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    label={"메뉴 설명"}
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
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    required={true}
                    label={"가격"}
                    value={insertComma(item?.menu_price || "0")}
                    inputRef={REFS?.[i]?.menu_price}
                    error={ERRORS?.[i]?.menu_price}
                    onChange={(e: any) => {
                      // 빈값 처리
                      let value = e.target.value === "" ? "0" : e.target.value.replace(/,/g, '');
                      // 999999999 제한 + 정수
                      if (Number(value) > 999999999 || !/^\d+$/.test(value)) {
                        return;
                      }
                      // 01, 05 같은 숫자는 1, 5로 변경
                      if (/^0(?!\.)/.test(value)) {
                        value = value.replace(/^0+/, '');
                      }
                      // object 설정
                      setOBJECT((prev: any) => ({
                        ...prev,
                        menu_price: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <InputFile
                    required={true}
                    limit={3}
                    label={"메뉴 이미지"}
                    group={"menu"}
                    existing={item?.menu_images}
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
};
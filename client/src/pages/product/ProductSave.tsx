// ProductSave.tsx

import { useState, useEffect, memo } from "@exportReacts";
import { useCommonValue, useResponsive, useValidateProduct } from "@exportHooks";
import { useStoreAlert, useStoreLoading } from "@exportStores";
import { axios } from "@exportLibs";
import { makeForm, insertComma } from "@exportScripts";
import { Filter } from "@exportLayouts";
import { Product } from "@exportSchemas";
import { Input, InputFile, Select } from "@exportContainers";
import { Br, Paper, Grid, Card } from "@exportComponents";
import { MenuItem } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductSave = memo(() => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateProduct();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(Product);
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
        navigate(`/product/list`);
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
            <Grid container={true} spacing={3} key={`update-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"mt-10"}>
                  <Select
                    label={"카테고리"}
                    required={true}
                    value={item?.product_category}
                    inputRef={REFS?.[i]?.product_category}
                    error={ERRORS?.[i]?.product_category}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        product_category: e.target.value,
                      }));
                    }}
                  >
                    {["main", "side"].map((category: string, idx: number) => (
                      <MenuItem
                        key={idx}
                        value={category}
                        className={"fs-0-8rem"}
                      >
                        {category === "main" && "메인 상품"}
                        {category === "side" && "사이드 상품"}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Select
                    label={"순서"}
                    required={true}
                    value={item?.product_seq || 0}
                    inputRef={REFS?.[i]?.product_seq}
                    error={ERRORS?.[i]?.product_seq}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        product_seq: e.target.value,
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
                    label={"메뉴 이름"}
                    required={true}
                    value={item?.product_name}
                    inputRef={REFS?.[i]?.product_name}
                    error={ERRORS?.[i]?.product_name}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        product_name: e.target.value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <Input
                    label={"메뉴 설명"}
                    required={true}
                    value={item?.product_description}
                    inputRef={REFS?.[i]?.product_description}
                    error={ERRORS?.[i]?.product_description}
                    onChange={(e: any) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        product_description: e.target.value,
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
                    value={insertComma(item?.product_price || "0")}
                    inputRef={REFS?.[i]?.product_price}
                    error={ERRORS?.[i]?.product_price}
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
                        product_price: value,
                      }));
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <InputFile
                    label={"메뉴 이미지"}
                    required={true}
                    limit={3}
                    existing={item?.product_images}
                    group={"product"}
                    value={fileList}
                    inputRef={REFS?.[i]?.product_images}
                    error={ERRORS?.[i]?.product_images}
                    onChange={(updatedFiles: File[] | null) => {
                      setFileList(updatedFiles);
                    }}
                    handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                      setOBJECT((prev: any) => ({
                        ...prev,
                        product_images: updatedExistingFiles,
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
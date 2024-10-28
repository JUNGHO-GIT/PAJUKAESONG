// ProductSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateProduct } from "@imports/ImportValidates";
import { axios, makeFormData, insertComma } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Btn, Br } from "@imports/ImportComponents";
import { Input, InputFile, Select } from "@imports/ImportContainers";
import { Paper, Grid, Card, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateProduct();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
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
        navigate(`/product/list`);
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
        <Grid container={true} spacing={3} key={`save-${i}`}>
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
                  {category === "main" && "메인 메뉴"}
                  {category === "side" && "사이드 메뉴"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
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
      );
      return (
        <Card className={"d-col-center border-2 radius-1 shadow-1 p-20"}>
          {saveFragment(OBJECT, 0)}
        </Card>
      );
    };
    // 3. btn
    const btnSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate(`/product/list`, {
                state: {
                  category: OBJECT?.product_category,
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
      <Paper className={"content-wrapper fadeIn p-20"}>
        {LOADING ? <Loading /> : (
          <>
            {saveSection()}
            <Br px={20} />
            {btnSection()}
          </>
        )}
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
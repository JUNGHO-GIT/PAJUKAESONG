// ProductUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateProduct } from "@imports/ImportValidates";
import { axios, numeral, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Div, Btn, Br } from "@imports/ImportComponents";
import { Input, InputFile, Select } from "@imports/ImportContainers";
import { Paper, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id, } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateProduct();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Product);
  const [fileList, setFileList] = useState<File[] | null>(null);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      },
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Product);
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowUpdate = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, fileList, "update")) {
      setLOADING(false);
      return;
    }
    axios.put(`${URL}${SUBFIX}/update`,
      makeFormData(
        OBJECT,
        fileList,
        {
          _id: location_id
        }
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

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 2. update
    const updateSection = () => {
      const updateFragment = (item: any, i: number) => (
        <Grid container spacing={3} columns={12} className={"p-20"}>
          <Grid size={12} className={"mt-10"}>
            <Select
              variant={"outlined"}
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
              variant={"outlined"}
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
              variant={"outlined"}
              required={true}
              label={"가격"}
              value={numeral(item?.product_price).format("0,0")}
              inputRef={REFS?.[i]?.product_price}
              error={ERRORS?.[i]?.product_price}
              onChange={(e: any) => {
                const value = e.target.value.replace(/,/g, '');
                const newValue = value === "" ? 0 : Number(value);
                if (value === "") {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    product_price: "0",
                  }));
                }
                else if (!isNaN(newValue) && newValue <= 9999999999) {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    product_price: String(newValue),
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
        <Grid container spacing={0} columns={12} className={"border-1 radius-1 shadow-2"}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} key={`update-${0}`}>
            {updateFragment(OBJECT, 0)}
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
            className={"w-100p fs-1-0rem bg-burgundy"}
            onClick={() => {
              flowUpdate();
            }}
          >
            수정하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
        <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
          {LOADING ? <Loading /> : updateSection()}
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
      {updateNode()}
    </>
  );
};
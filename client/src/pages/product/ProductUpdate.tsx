// ProductUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateProduct } from "@imports/ImportValidates";
import { axios, numeral, makeFormData } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Input, InputFile, Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, location_id,
  } = useCommonValue();
  const {
    dayFmt
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateProduct();

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
  const flowUpdate = () => {
    setLOADING(true);
    if (!validate(OBJECT, fileList, "update")) {
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
        alert(res.data.msg);
        document?.querySelector("input[type=file]")?.remove();
        navigate(`/product/list`);
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

  // 7. updateNode ---------------------------------------------------------------------------------
  const updateNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              제품 수정
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. update
    const updateSection = () => {
      const updateFragment = (i: number) => (
        <Card className={"border-1 shadow-1 radius-1 p-30"} key={`update-${i}`}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Select
                variant={"outlined"}
                label={"상품 카테고리"}
                required={true}
                value={OBJECT?.product_category}
                inputRef={REFS?.[i]?.product_category}
                error={ERRORS?.[i]?.product_category}
                onChange={(e: any) => {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    product_category: e.target.value,
                  }));
                }}
              >
                {["main", "side"].map((item: string, idx: number) => (
                  <MenuItem key={idx} value={item} className={"fs-0-8rem"}>
                    {item === "main" && "메인상품"}
                    {item === "side" && "사이드상품"}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"상품 이름"}
                required={true}
                value={OBJECT?.product_name}
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
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"상품 설명"}
                required={true}
                value={OBJECT?.product_description}
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
            <Grid size={12} className={"d-column-center"}>
              <Input
                variant={"outlined"}
                label={"가격"}
                value={numeral(OBJECT?.product_price).format("0,0")}
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
            <Grid size={12} className={"d-column-center"}>
              <InputFile
                variant={"outlined"}
                label={"제품 이미지"}
                required={true}
                limit={1}
                existing={OBJECT?.product_images}
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
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            {updateFragment(0)}
          </Grid>
        </Grid>
      )
    };
    // 3. btn
    const btnSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-row-right"}>
            <Btn
              className={"w-100p fs-1-0rem bg-grey"}
              onClick={() => {
                navigate(`/product/list`);
              }}
            >
              목록으로
            </Btn>
          </Grid>
          <Grid size={6} className={"d-row-left"}>
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
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {updateSection()}
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
      {LOADING ? <Loading /> : updateNode()}
    </>
  );
};
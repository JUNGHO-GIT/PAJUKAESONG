// ProductUpdate.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert, useValidateProduct } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm, insertComma } from "@importScripts";
import { Product } from "@importSchemas";
import { Loader } from "@importLayouts";
import { Input, InputFile, Select } from "@importContainers";
import { Btn, Br } from "@importComponents";
import { Paper, Grid, Card, MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const ProductUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id } = useCommonValue();
  const { REFS, ERRORS, validate } = useValidateProduct();
  const { ALERT, setALERT } = useStoreAlert();

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
      makeForm( OBJECT, fileList, { _id: location_id } ),
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
        <Grid container={true} spacing={3} key={`update-${i}`}>
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
              required={true}
              label={"메뉴 설명"}
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
              required={true}
              limit={3}
              label={"메뉴 이미지"}
              group={"product"}
              existing={item?.product_images}
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
          {updateFragment(OBJECT, 0)}
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
      <Paper className={"content-wrapper fadeIn p-20"}>
        {LOADING ? <Loader /> : (
          <>
            {updateSection()}
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
      {updateNode()}
    </>
  );
};
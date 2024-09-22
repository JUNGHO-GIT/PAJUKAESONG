// MenuUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateMenu } from "@imports/ImportValidates";
import { axios, numeral } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Input, FileInput, Btn, Select } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, adminId, location_id,
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

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      },
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Menu);
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
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
        navigate("/menu/list");
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
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        가맹점 수정
      </Div>
    );
    // 2. update
    const updateSection = (i: number) => (
      <Card className={"border radius shadow p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"메뉴 카테고리"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.menu_category}
              inputRef={REFS[i]?.menu_category}
              error={ERRORS[i]?.menu_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_category: e.target.value,
                }));
              }}
            >
              {["main", "side"].map((item: string, idx: number) => (
                <MenuItem key={idx} value={item} className={"fs-0-8rem"}>
                  {item === "main" && "메인메뉴"}
                  {item === "side" && "사이드메뉴"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"메뉴 이름"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.menu_name}
              inputRef={REFS[i]?.menu_name}
              error={ERRORS[i]?.menu_name}
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
              className={"border-bottom"}
              value={OBJECT.menu_description}
              inputRef={REFS[i]?.menu_description}
              error={ERRORS[i]?.menu_description}
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
              label={"가격"}
              className={"border-bottom"}
              value={numeral(OBJECT?.menu_price).format("0,0")}
              inputRef={REFS[i]?.menu_price}
              error={ERRORS[i]?.menu_price}
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
              label={"작성일"}
              shrink={"shrink"}
              className={"border-bottom"}
              readOnly={true}
              value={dayFmt}
            />
          </Grid>
          <Grid size={12}>
            <FileInput
              variant={"outlined"}
              label={"가맹점 사진"}
              required={true}
              limit={2}
              existing={OBJECT.menu_images}
              group={"menu"}
              value={fileList}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
              onExistingChange={(updatedExistingFiles: string[]) => {
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
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-right"}>
            <Btn
              className={"w-70p fs-1-0rem bg-burgundy"}
              onClick={() => {
                flowSave();
              }}
            >
              수정하기
            </Btn>
          </Grid>
          <Grid size={6} className={"d-left"}>
            <Btn
              className={"w-70p fs-1-0rem bg-light black"}
              onClick={() => {
                navigate("/menu/list");
              }}
            >
              목록으로
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : updateSection(0)}
          </Grid>
          <Br px={5} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {btnSection(0)}
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
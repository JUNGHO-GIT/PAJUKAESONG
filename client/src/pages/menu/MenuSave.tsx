// MenuSave.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateMenu } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { Menu } from "@imports/ImportSchemas";
import { Div, Select, Br, Input, FileInput, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuSave = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, adminId,
  } = useCommonValue();
  const {
    dayFmt
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateMenu();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [mapAddress, setMapAddress] = useState<string>("");
  const [OBJECT, setOBJECT] = useState<any>(Menu);
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    console.log("===================================");
    console.log("OBJECT", JSON.stringify(OBJECT, null, 2));
  }, [OBJECT]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowSave = async () => {
    setLOADING(true);
    if (!validate(OBJECT)) {
      setLOADING(false);
      return;
    }
    await axios.post(`${URL}${SUBFIX}/save`,
      makeFormData(
        OBJECT,
        fileList,
        {
          user_id: adminId
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

  // 7. saveNode -----------------------------------------------------------------------------------
  const saveNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        메뉴 등록
      </Div>
    );
    // 2. save
    const saveSection = () => {
      const saveFragment = (i: number) => (
        <Grid container spacing={3} className={"text-left"}>
          <Grid size={12}>
            <Select
              variant={"standard"}
              label={"메뉴 카테고리"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.menu_category || ""}
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
                  {item}
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
              value={OBJECT.menu_title}
              inputRef={REFS[i]?.menu_title}
              error={ERRORS[i]?.menu_title}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_title: e.target.value,
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
              value={OBJECT.menu_content}
              inputRef={REFS[i]?.menu_content}
              error={ERRORS[i]?.menu_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_content: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"메뉴 가격"}
              required={true}
              className={"border-bottom"}
              value={OBJECT.menu_price}
              inputRef={REFS[i]?.menu_price}
              error={ERRORS[i]?.menu_price}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  menu_price: e.target.value,
                }));
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
              id={"menu_image"}
              limit={1}
              existing={OBJECT.menu_image}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
            />
          </Grid>
        </Grid>
      );
      const btnFragment = () => (
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
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
      );
      return (
        <Card className={"border radius shadow p-30 fadeIn"}>
          {saveFragment(0)}
          <Br px={50} />
          {btnFragment()}
        </Card>
      );
    };
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {saveSection()}
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
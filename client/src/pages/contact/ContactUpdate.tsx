// ContactUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateContact } from "@imports/ImportValidates";
import { axios, makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Contact } from "@imports/ImportSchemas";
import { Select, Input, TextArea, InputFile } from "@imports/ImportContainers";
import { Div, Btn, Br, Hr } from "@imports/ImportComponents";
import { Paper, Grid, MenuItem } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id, } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { REFS, ERRORS, validate } = useValidateContact();
  const { ALERT, setALERT } = useAlertStore();

  // 1. common -------------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Contact);
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
      setOBJECT(res.data.result || Contact);
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
      makeFormData( OBJECT, fileList, { _id: location_id } ),
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
        navigate("/contact/find");
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
        <Grid container spacing={3} columns={12}>
          <Grid size={12} className={"mt-10"}>
            <Select
              variant={"outlined"}
              label={"문의 유형"}
              required={true}
              value={item?.contact_category}
              inputRef={REFS?.[i]?.contact_category}
              error={ERRORS?.[i]?.contact_category}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_category: e.target.value,
                }));
              }}
            >
              {["franchise", "personal"].map((category: string, idx: number) => (
                <MenuItem key={idx} value={category} className={"fs-0-8rem"}>
                  {category === "franchise" && "가맹 문의"}
                  {category === "personal" && "1:1 문의"}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              label={"이름"}
              required={true}
              value={item?.contact_name}
              inputRef={REFS?.[i]?.contact_name}
              error={ERRORS?.[i]?.contact_name}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              label={"이메일"}
              required={true}
              value={item?.contact_email}
              inputRef={REFS?.[i]?.contact_email}
              error={ERRORS?.[i]?.contact_email}
              placeholder={"abcd@naver.com"}
              onChange={(e: any) => {
                const value = e.target.value;
                if (value.length > 30) {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    contact_email: prev.contact_email,
                  }));
                }
                else {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    contact_email: value,
                  }));
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              label={"전화번호"}
              required={true}
              value={item?.contact_phone}
              inputRef={REFS?.[i]?.contact_phone}
              error={ERRORS?.[i]?.contact_phone}
              placeholder={"010-1234-5678"}
              onChange={(e: any) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                const newValue = value.replace(/(\d{3})(\d{1,4})(\d{1,4})/, '$1-$2-$3');
                if (value.length > 11) {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    contact_phone: prev.contact_phone,
                  }));
                }
                else {
                  setOBJECT((prev: any) => ({
                    ...prev,
                    contact_phone: newValue,
                  }));
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"outlined"}
              label={"문의 제목"}
              required={true}
              value={item?.contact_title}
              inputRef={REFS?.[i]?.contact_title}
              error={ERRORS?.[i]?.contact_title}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_title: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextArea
              label={"문의 내용"}
              required={true}
              inputclass={"h-50vh"}
              value={item?.contact_content}
              inputRef={REFS?.[i]?.contact_content}
              error={ERRORS?.[i]?.contact_content}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_content: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              variant={"outlined"}
              label={"문의 이미지"}
              required={true}
              limit={1}
              existing={item?.contact_images}
              group={"contact"}
              value={fileList}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
              handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  contact_images: updatedExistingFiles,
                }));
              }}
            />
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12} className={"border-2 radius-1 shadow-1 p-20"}>
          <Grid size={12} className={"d-col-center"} key={`update-${0}`}>
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
              navigate(`/contact/find`);
            }}
          >
            목록으로
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-light-black"}
            onClick={() => {
              flowUpdate()
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
        <Grid container spacing={0} columns={12} className={"py-50"}>
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
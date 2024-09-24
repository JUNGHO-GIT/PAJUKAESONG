// FranchiseUpdate.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useValidateFranchise } from "@imports/ImportValidates";
import { axios } from "@imports/ImportLibs";
import { makeFormData } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Div, Br, Input, FileInput, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, URL, SUBFIX, location_id,
  } = useCommonValue();
  const {
    dayFmt
  } = useCommonDate();
  const {
    REFS, ERRORS, validate,
  } = useValidateFranchise();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [mapAddress, setMapAddress] = useState<string>("");
  const [OBJECT, setOBJECT] = useState<any>(Franchise);
  const [fileList, setFileList] = useState<any>([]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      },
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Franchise);
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
    if (!validate(OBJECT, fileList)) {
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
        navigate("/franchise/list");
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

  // 4. handle ------------------------------------------------------------------------------------
  const handleMap = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddress: string = data.address;
        let extraAddress: string = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setOBJECT((prev: any) => ({
          ...prev,
          franchise_address_main: data.address,
        }));
        setMapAddress(fullAddress);
      },
    }).open();
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
      <Card className={"border-1 radius shadow p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 이름"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT?.franchise_name}
              inputRef={REFS?.[i]?.franchise_name}
              error={ERRORS?.[i]?.franchise_name}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 주소"}
              required={true}
              readOnly={true}
              className={"border-bottom pointer"}
              value={OBJECT?.franchise_address_main}
              inputRef={REFS?.[i]?.franchise_address_main}
              error={ERRORS?.[i]?.franchise_address_main}
              onClick={() => {
                handleMap();
              }}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_address_main: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"상세주소"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT?.franchise_address_detail}
              inputRef={REFS?.[i]?.franchise_address_detail}
              error={ERRORS?.[i]?.franchise_address_detail}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_address_detail: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <Input
              variant={"standard"}
              label={"가맹점 전화번호"}
              required={true}
              className={"border-bottom-1"}
              value={OBJECT?.franchise_phone}
              inputRef={REFS?.[i]?.franchise_phone}
              error={ERRORS?.[i]?.franchise_phone}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_phone: e.target.value,
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
              className={"border-bottom-1"}
              readOnly={true}
              value={dayFmt}
            />
          </Grid>
          <Grid size={12}>
            <FileInput
              variant={"outlined"}
              label={"가맹점 이미지"}
              required={true}
              limit={1}
              existing={OBJECT?.franchise_images}
              group={"franchise"}
              value={fileList}
              onChange={(updatedFiles: File[] | null) => {
                setFileList(updatedFiles);
              }}
              handleExistingFilesChange={(updatedExistingFiles: string[]) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_images: updatedExistingFiles,
                }));
              }}
            />
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-right"}>
            <Btn
              className={"w-70p fs-1-0rem bg-light black"}
              onClick={() => {
                navigate(`/franchise/list`);
              }}
            >
              목록으로
            </Btn>
          </Grid>
          <Grid size={6} className={"d-left"}>
            <Btn
              className={"w-70p fs-1-0rem bg-burgundy"}
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : updateSection(0)}
          </Grid>
          <Br px={5} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection(0)}
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
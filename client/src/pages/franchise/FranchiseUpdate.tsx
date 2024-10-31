// FranchiseUpdate.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert } from "@importHooks";
import { useValidateFranchise, useResponsive } from "@importHooks";
import { axios } from "@importLibs";
import { makeForm } from "@importScripts";
import { Franchise } from "@importSchemas";
import { Loader, Filter } from "@importLayouts";
import { Input, InputFile, Select } from "@importContainers";
import { Br } from "@importComponents";
import { Paper, Grid, Card, MenuItem } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseUpdate = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, URL, SUBFIX, location_id, } = useCommonValue();
  const { paperClass } = useResponsive();
  const { REFS, ERRORS, validate } = useValidateFranchise();
  const { ALERT, setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [_mapAddress, setMapAddress] = useState<string>("");
  const [OBJECT, setOBJECT] = useState<any>(Franchise);
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
      setOBJECT(res.data.result || Franchise);
    })
    .catch((err: any) => {
      console.error(err);
    })
    .finally(() => {
      setTimeout(() => {
        setLOADING(false);
      }, 300);
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
        navigate("/franchise/list");
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
      setTimeout(() => {
        setLOADING(false);
      }, 300);
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
    // 2. update
    const updateSection = () => {
      const updateFragment = (item: any, i: number) => (
        <Grid container={true} spacing={3} key={`update-${i}`}>
          <Grid size={12} className={"mt-10"}>
            <Select
              label={"순서"}
              required={true}
              value={item?.franchise_seq || 0}
              inputRef={REFS?.[i]?.franchise_seq}
              error={ERRORS?.[i]?.franchise_seq}
              onChange={(e: any) => {
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_seq: e.target.value,
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
              label={"가맹점 이름"}
              required={true}
              value={item?.franchise_name}
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
              label={"가맹점 주소"}
              required={true}
              readOnly={true}
              className={"pointer"}
              value={item?.franchise_address_main}
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
              label={"상세주소"}
              required={true}
              value={item?.franchise_address_detail}
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
              label={"가맹점 전화번호"}
              required={true}
              value={item?.franchise_phone}
              inputRef={REFS?.[i]?.franchise_phone}
              error={ERRORS?.[i]?.franchise_phone}
              placeholder={"010-1234-5678"}
              onChange={(e: any) => {
                // 빈값 처리
                let value = e.target.value === "" ? "" : e.target.value.replace(/[^0-9]/g, "")
                // 11자 제한 + 정수
                if (value.length > 11 || !/^\d+$/.test(value)) {
                  return;
                }
                // 010-1234-5678 형식으로 변경
                if (7 <= value.length && value.length < 12) {
                  value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
                }
                else if (4 <= value.length && value.length < 7) {
                  value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                }
                else if (0 <= value.length && value.length < 4) {
                  value = value.replace(/(\d{0,3})/, "$1");
                }
                // object 설정
                setOBJECT((prev: any) => ({
                  ...prev,
                  franchise_phone: value,
                }));
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputFile
              label={"가맹점 이미지"}
              required={true}
              limit={3}
              existing={item?.franchise_images}
              group={"franchise"}
              value={fileList}
              inputRef={REFS?.[i]?.franchise_images}
              error={ERRORS?.[i]?.franchise_images}
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
      );
      return (
        <Card className={"d-col-center border-1 radius-1 shadow-1 p-20"}>
          {updateFragment(OBJECT, 0)}
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
          flowUpdate
        }}
      />
    );
    // 10. return
    return (
      <Paper className={paperClass}>
        {LOADING ? <Loader /> : (
          <>
            {updateSection()}
            <Br px={20} />
            {filterSection()}
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
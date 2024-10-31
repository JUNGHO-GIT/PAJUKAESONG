// ContactDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate } from "@importHooks";
import { useStoreAlert, useValidateContact } from "@importHooks";
import { axios } from "@importLibs";
import { Contact } from "@importSchemas";
import { Loader } from "@importLayouts";
import { TextArea } from "@importContainers";
import { Div, Hr, Icons } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const ContactDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { ALERT, setALERT } = useStoreAlert();
  const { validate } = useValidateContact();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Contact);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Contact);
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
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = async () => {
    setLOADING(true);
    if (!await validate(OBJECT, null, "delete")) {
      setLOADING(false);
      return;
    }
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: OBJECT?._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        setALERT({
          open: !ALERT.open,
          severity: "success",
          msg: res.data.msg,
        });
        navigate('/contact/list', {
          state: {
            contact_name: OBJECT?.contact_name,
            contact_phone: OBJECT?.contact_phone,
          },
        });
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

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 2. detail
    const detailSection = () => {
      const headFragment = (item: any, i: number) => (
        <Grid container={true} spacing={1} key={`head-${i}`}>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              {item?.contact_title}
            </Div>
          </Grid>
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-2rem fw-500 grey"}>
              {`[${item?.contact_category === "franchise" ? "가맹 문의" : "1:1 문의"}]`}
            </Div>
          </Grid>
        </Grid>
      );
      const descFragment = (item: any, i: number) => (
        <Grid container={true} spacing={2} key={`desc-${i}`}>
          <Grid size={12}>
            <TextArea
              label={""}
              disabled={true}
              value={item?.contact_content}
              inputclass={"h-min50vh border-none"}
            />
          </Grid>
          <Grid size={9} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {getDayFmt(item?.contact_regDt)}
            </Div>
          </Grid>
          <Grid size={3} className={"d-row-right"}>
            <Icons
              key={"Person"}
              name={"Person"}
              fill={"whitesmoke"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500 me-10"}>
              {item?.contact_name}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Card className={"d-col-center bg-ivory-light border-2 radius-1 shadow-1 p-20"}>
          {headFragment(OBJECT, 0)}
          <Hr px={40} className={"bg-burgundy"} />
          {descFragment(OBJECT, 0)}
        </Card>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
        <Grid size={6} className={"d-row-left"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy"}
            onClick={() => {
              navigate("/contact/list", {
                state: {
                  contact_name: OBJECT?.contact_name,
                  contact_phone: OBJECT?.contact_phone
                }
              });
            }}
          >
            목록으로
          </Div>
        </Grid>
        <Grid size={6} className={"d-row-right"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
            onClick={() => {
              navigate("/contact/update", {
                state: {
                  _id: OBJECT?._id
                }
              });
            }}
          >
            수정
          </Div>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy ms-10"}
            onClick={() => {
              flowDelete();
            }}
          >
            삭제
          </Div>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn bg-ivory-light p-20"}>
        {LOADING ? <Loader /> : (
          <>
            {detailSection()}
            <Hr px={40} className={"bg-grey"} />
            {filterSection()}
          </>
        )}
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {detailNode()}
    </>
  );
};
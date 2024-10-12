// ContactDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { useValidateContact } from "@imports/ImportValidates";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Contact } from "@imports/ImportSchemas";
import { Div, Hr, Br, Icons } from "@imports/ImportComponents";
import { TextArea } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { ALERT, setALERT } = useAlertStore();
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
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={12}>
            <Div className={"fs-2-0rem fw-700"}>
              문의 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => {
      const headFragment = (item: any) => (
        <Card className={"p-10"}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Div className={"fs-1-6rem fw-700"}>
                {item?.contact_title}
              </Div>
              <Div className={"fs-1-2rem fw-500 grey"}>
                {`[${item?.contact_category === "franchise" ? "가맹 문의" : "1:1 문의"}]`}
              </Div>
            </Grid>
            <Hr px={20} className={"bg-burgundy"} />
          </Grid>
        </Card>
      );
      const descFragment = (item: any) => (
        <Card className={"p-0"}>
          <Grid container spacing={2} columns={12}>
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
        </Card>
      );
      return (
        <Card className={"border-1 radius-1 shadow-1 p-10"}>
          <Grid container spacing={0} columns={12}>
            <Grid
              key={`detail-${0}`}
              size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
              className={"d-column-center"}
            >
              {headFragment(OBJECT)}
              {descFragment(OBJECT)}
            </Grid>
          </Grid>
        </Card>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-10"}>
        <Grid container spacing={2} columns={12}>
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
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            {LOADING ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                <Br px={30} />
                {detailSection()}
                <Hr px={40} className={"bg-grey"} />
                {filterSection()}
              </>
            )}
          </Grid>
        </Grid>
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
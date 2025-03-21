// ContactDetail.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useCommonDate, useResponsive, useValidateContact } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importStores";
import { axios } from "@importLibs";
import { Contact } from "@importSchemas";
import { Filter } from "@importLayouts";
import { TextArea } from "@importContainers";
import { Div, Hr, Icons, Paper, Grid, Card } from "@importComponents";

// -------------------------------------------------------------------------------------------------
export const ContactDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, location_id, URL, SUBFIX } = useCommonValue();
  const { getDayFmt } = useCommonDate();
  const { paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();
  const { validate } = useValidateContact();

  // 2-1. useState ---------------------------------------------------------------------------------
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
      setLOADING(false);
      setOBJECT(res.data.result || Contact);
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
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
          open: true,
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
        setLOADING(false);
        setALERT({
          open: true,
          severity: "success",
          msg: res.data.msg,
        });
      }
    })
    .catch((err: any) => {
      setLOADING(false);
      setALERT({
        open: true,
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
      const headFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={1} key={`head-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"fs-1-8rem fw-700"}>
                    {item?.contact_title}
                  </Div>
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={12} className={"d-row-center"}>
                  <Div className={"fs-1-2rem fw-500 grey"}>
                    {`[${item?.contact_category === "franchise" ? "가맹 문의" : "1:1 문의"}]`}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      const descFragment = () => (
        <Grid container={true} spacing={0}>
          {[OBJECT].filter((_:any, idx: number) => idx === 0).map((item: any, i: number) => (
            <Grid container={true} spacing={2} key={`desc-${i}`}>
              <Grid container={true} spacing={0}>
                <Grid size={12}>
                  <TextArea
                    label={""}
                    disabled={true}
                    value={item?.contact_content}
                    inputclass={"h-min-50vh border-none"}
                  />
                </Grid>
              </Grid>
              <Grid container={true} spacing={0}>
                <Grid size={9} className={"d-row-left"}>
                  <Icons
                    key={"Calendar"}
                    name={"Calendar"}
                    fill={"whitesmoke"}
                    className={"w-20px h-20px"}
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
                    className={"w-20px h-20px"}
                  />
                  <Div className={"fs-0-9rem fw-500 mr-10px"}>
                    {item?.contact_name}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-1 radius-2 shadow-1 p-20px"}>
          {headFragment()}
          <Hr m={40} className={"bg-burgundy h-2px"} />
          {descFragment()}
        </Card>
      )
    };
    // 4. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={null}
        setPAGING={null}
        COUNT={null}
        flow={{
          flowDelete
        }}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {detailSection()}
        <Hr m={60} className={"bg-light h-2px"} />
        {filterSection()}
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
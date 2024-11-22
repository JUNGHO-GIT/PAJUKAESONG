// MenuList.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive } from "@importHooks";
import { useStoreAlert, useStoreLoading } from "@importHooks";
import { axios } from "@importLibs";
import { Menu } from "@importSchemas";
import { Filter } from "@importLayouts";
import { Div, Img, Hr } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate, location_category } = useCommonValue();
  const { paperClass } = useResponsive();
  const { setALERT } = useStoreAlert();
  const { setLOADING } = useStoreLoading();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>([Menu]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/list`, {
      params: {
        PAGING: PAGING,
        category: location_category
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Menu]);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
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
  }, [URL, SUBFIX, PAGING, location_category]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 2. list
    const listSection = () => {
      const listFragment = () => (
        <Grid container={true} spacing={0}>
          {OBJECT.filter((f: any) => f).map((item: any, i: number) => (
            <Grid size={{ xs: 6, md: 4 }} className={"d-col-center p-10"} key={`list-${i}`}>
              <Grid container={true} spacing={2}>
                <Grid size={12}>
                  <Img
                    max={400}
                    hover={true}
                    shadow={true}
                    radius={true}
                    group={"menu"}
                    src={item.menu_images[0]}
                    onClick={() => {
                      navigate("/menu/detail", {
                        state: {
                          _id: item?._id,
                          category: item?.menu_category
                        }
                      });
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <Div className={"fs-1-2rem fw-600"}>
                    {item?.menu_name}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center border-0 shadow-0"}>
          {listFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Filter
        OBJECT={OBJECT}
        PAGING={PAGING}
        setPAGING={setPAGING}
        COUNT={COUNT}
      />
    );
    // 10. return
    return (
      <Paper className={`${paperClass} border-0 shadow-0`}>
        {listSection()}
        <Hr m={60} className={"bg-light h-5"} />
        {filterSection()}
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};
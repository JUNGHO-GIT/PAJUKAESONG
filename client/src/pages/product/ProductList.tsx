// ProductList.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert } from "@importHooks";
import { useResponsive } from "@importHooks";
import { axios } from "@importLibs";
import { Product } from "@importSchemas";
import { Loader, Filter } from "@importLayouts";
import { Div, Img, Hr } from "@importComponents";
import { Paper, Grid, Card } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const ProductList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate } = useCommonValue();
  const { paperClass } = useResponsive();
  const { ALERT, setALERT } = useStoreAlert();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([Product]);
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
        PAGING: PAGING
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Product]);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
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
      }, 100);
    });
  }, [URL, SUBFIX, PAGING]);

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
                    group={"product"}
                    src={item.product_images[0]}
                    onClick={() => {
                      navigate("/product/detail", {
                        state: {
                          _id: item?._id,
                          category: item?.product_category
                        }
                      });
                    }}
                  />
                </Grid>
                <Grid size={12} className={"d-center"}>
                  <Div className={"fs-1-2rem fw-600"}>
                    {item?.product_name}
                  </Div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
      return (
        <Card className={"d-col-center"}>
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
      <Paper className={`${paperClass}`}>
        {LOADING ? <Loader /> : (
          <>
            {listSection()}
            <Hr m={60} className={"bg-light h-5"} />
            {filterSection()}
          </>
        )}
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
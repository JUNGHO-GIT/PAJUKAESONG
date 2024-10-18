// ProductList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Product } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Btn } from "@imports/ImportComponents";
import { Select } from "@imports/ImportContainers";
import { Paper, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ProductList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate, isAdmin, } = useCommonValue();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

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
      setLOADING(false);
    });
  }, [URL, SUBFIX, PAGING]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 2. list
    const listSection = () => {
      const imageFragment = (item: any) => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-col-center"}>
            <Img
              max={isXxs ? 230 : 280}
              hover={true}
              shadow={true}
              radius={true}
              group={"product"}
              src={item.product_images && item.product_images[0]}
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
        </Grid>
      );
      const descFragment = (item: any) => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-2rem fw-600"}>
              {item?.product_name}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={2} columns={12}>
          {OBJECT?.map((item: any, i: number) => (
            <Grid size={{ xs: 6, md: 5, xl: 4 }} className={"d-col-center"} key={`list-${i}`}>
              {imageFragment(item)}
              {descFragment(item)}
            </Grid>
          ))}
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12} className={"px-10"}>
        <Grid size={3} className={"d-col-center"}>
          <Select
            label={""}
            value={PAGING?.sort}
            inputclass={"h-min0 h-5vh"}
            onChange={(e: any) => (
              setPAGING((prev: any) => ({
                ...prev,
                sort: e.target.value
              }))
            )}
          >
            {["asc", "desc"]?.map((item: string) => (
              <MenuItem
                key={item}
                value={item}
                selected={PAGING?.sort === item}
                onChange={(e: any) => (
                  setPAGING((prev: any) => ({
                    ...prev,
                    sort: e.target.value
                  }))
                )}
              >
                <Div className={"fs-0-8rem"}>
                  {item === "asc" && "오름차순"}
                  {item === "desc" && "내림차순"}
                </Div>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={7} className={"d-col-center"}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={COUNT.totalCnt}
            page={PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1 p-2"}
            onPageChange={(_event, newPage) => {
              setPAGING((prev: any) => ({
                ...prev,
                page: newPage
              }));
            }}
            onRowsPerPageChange={(event) => {
              setPAGING((prev: any) => ({
                ...prev,
                limit: parseFloat(event.target.value)
              }));
            }}
          />
        </Grid>
        <Grid size={2} className={`${isAdmin ? "d-col-center" : "d-none"}`}>
          <Btn
            className={"bg-burgundy"}
            onClick={() => {
              navigate("/product/save");
            }}
          >
            등록
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={0} columns={12} className={"py-20"}>
          <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-col-center"}>
            {LOADING ? <Loading /> : listSection()}
            <Hr px={40} className={"bg-grey"} />
            {filterSection()}
          </Grid>
        </Grid>
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
// MenuList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { useAlertStore } from "@imports/ImportStores";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Hr, Btn } from "@imports/ImportComponents";
import { Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate, isAdmin, location_category } = useCommonValue();
  const { isXxs } = useResponsive();
  const { ALERT, setALERT } = useAlertStore();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
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
        open: !ALERT.open,
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
      const imageFragment = (item: any) => (          <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center p-10"}>
            <Img
              max={isXxs ? 230 : 280}
              hover={true}
              shadow={true}
              radius={true}
              group={"menu"}
              src={item.menu_images && item.menu_images[0]}
              onClick={() => {
                navigate("/menu/detail", {
                  state: {
                    _id: item?._id,
                    location_category: item?.category
                  }
                });
              }}
            />
          </Grid>
        </Grid>
      );
      const descFragment = (item: any) => (
        <Grid container spacing={0} columns={12}>
          <Grid size={12} className={"d-center p-0"}>
            <Div className={"fs-1-2rem fw-600"}>
              {item?.menu_name}
            </Div>
          </Grid>
        </Grid>
      );
      return (
        <Grid container spacing={0} columns={12}>
          {OBJECT.map((item: any, i: number) => (
            <Grid
              key={`list-${i}`}
              size={{ xs: 6, sm: 6, md: 5, lg: 4, xl: 4 }}
              className={"d-column-center"}
            >
              {imageFragment(item)}
              {descFragment(item)}
            </Grid>
          ))}
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} columns={12}>
        <Grid size={3} className={"d-column-center"}>
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
        <Grid size={7} className={"d-column-center"}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={COUNT.totalCnt}
            page={PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1"}
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
        <Grid size={2} className={`${isAdmin ? "d-column-center" : "d-none"}`}>
          <Btn
            className={"bg-burgundy fs-0-7rem"}
            onClick={() => {
              navigate("/menu/save");
            }}
          >
            등록
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Grid container spacing={0} columns={12}>
        <Grid size={{ xs: 11, sm: 9, md: 8, lg: 7, xl: 6 }} className={"d-column-center"}>
          <Paper className={"content-wrapper fadeIn"}>
            {LOADING ? <Loading /> : listSection()}
            <Hr px={40} className={"bg-grey"} />
            {filterSection()}
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};
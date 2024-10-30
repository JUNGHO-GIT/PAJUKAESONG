// MenuList.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive, useStoreAlert } from "@importHooks";
import { axios } from "@importLibs";
import { Menu } from "@importSchemas";
import { Loader } from "@importLayouts";
import { Select } from "@importContainers";
import { Div, Img, Hr, Btn } from "@importComponents";
import { Paper, Grid, Card, MenuItem, TablePagination } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, SUBFIX, navigate, isAdmin, location_category } = useCommonValue();
  const { ALERT, setALERT } = useStoreAlert();

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
      const listFragment = () => (
        <Grid container={true} spacing={0}>
          {OBJECT.map((item: any, i: number) => (
            <Grid size={{ xs: 6, md: 4 }} className={"d-col-center p-10"} key={`list-${i}`}>
              <Grid container={true} spacing={2}>
                <Grid size={12}>
                  <Img
                    hover={true}
                    shadow={true}
                    radius={true}
                    group={"menu"}
                    src={item.menu_images && item.menu_images[0]}
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
        <Card className={"d-col-center"}>
          {listFragment()}
        </Card>
      );
    };
    // 3. filter
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
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
      <Paper className={"content-wrapper fadeIn p-20"}>
        {LOADING ? <Loader /> : (
          <>
            {listSection()}
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
      {listNode()}
    </>
  );
};
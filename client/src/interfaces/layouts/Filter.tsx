// Filter.tsx

import { useCommonValue } from "@importHooks";
import { Select } from "@importContainers";
import { Div, Btn } from "@importComponents";
import { Grid, Paper, MenuItem, TablePagination } from "@importMuis";

// -------------------------------------------------------------------------------------------------
declare type FilterProps = {
  OBJECT: any;
  PAGING: any;
  setPAGING: any;
  COUNT: any;
  flow?: any;
  extra?: any;
}

// -------------------------------------------------------------------------------------------------
export const Filter = (
  { OBJECT, PAGING, setPAGING, COUNT, flow, extra }: FilterProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { firstStr, secondStr, navigate, isAdmin } = useCommonValue();

  // 7. filter -------------------------------------------------------------------------------------
  const filterNode = () => {
    // 0. find
    const isFindSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={12}>
          <Btn
            className={"w-100p fs-1-0rem bg-black"}
            onClick={() => {
              flow.flowSearch();
            }}
          >
            조회하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 1. admin
    const isAdminSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={4} className={"d-row-center"}>
          <Select
            value={PAGING?.sort}
            inputclass={"h-min-0px h-5vh"}
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
        <Grid size={8} className={"d-row-center"}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={COUNT.totalCnt}
            page={PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1 p-2px"}
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
      </Grid>
    );
    // 1. list
    const isListSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={3} className={"d-row-center"}>
          <Select
            value={PAGING?.sort}
            inputclass={"h-min-0px h-5vh"}
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
        <Grid size={7} className={"d-row-center"}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={COUNT.totalCnt}
            page={PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            className={"border-bottom-1 p-2px"}
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
        <Grid size={2} className={`${isAdmin ? "d-row-center" : "d-none"}`}>
          <Btn
            className={"bg-burgundy"}
            onClick={() => {
              navigate(`/${firstStr}/save`);
            }}
          >
            등록
          </Btn>
        </Grid>
      </Grid>
    );
    // 2. detail
    const isDetailSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy"}
            onClick={() => {
              navigate(`/${firstStr}/list`, {
                state: {
                  category: OBJECT?.[`${firstStr}_category`]
                }
              });
            }}
          >
            목록으로
          </Div>
        </Grid>
        <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-row-right" : "d-none"}`}>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy mr-10px"}
            onClick={() => {
              navigate(`/${firstStr}/update`, {
                state: {
                  _id: OBJECT?._id
                }
              });
            }}
          >
            수정
          </Div>
          <Div
            className={"fs-1-0rem fw-700 pointer-burgundy ml-10px"}
            onClick={() => {
              flow.flowDelete();
            }}
          >
            삭제
          </Div>
        </Grid>
      </Grid>
    );
    // 3. save
    const isSaveSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate(`/${firstStr}/list`, {
                state: {
                  category: OBJECT?.[`${firstStr}_category`],
                },
              });
            }}
          >
            목록으로
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-black"}
            onClick={() => {
              flow.flowSave();
            }}
          >
            {firstStr === "order" && "주문하기"}
            {firstStr === "notice" && "등록하기"}
            {firstStr === "contact" && "문의하기"}
            {firstStr === "menu" && "등록하기"}
            {firstStr === "product" && "등록하기"}
            {firstStr === "franchise" && "등록하기"}
          </Btn>
        </Grid>
      </Grid>
    );
    // 4. update
    const isUpdateSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate(`/${firstStr}/list`, {
                state: {
                  category: OBJECT?.[`${firstStr}_category`],
                },
              });
            }}
          >
            목록으로
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-black"}
            onClick={() => {
              flow.flowUpdate();
            }}
          >
            수정하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 5. order
    const isOrderSection = () => (
      <Grid container={true} spacing={2} className={"px-10px"}>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-grey"}
            onClick={() => {
              navigate(`/product/list`);
            }}
          >
            더 찾기
          </Btn>
        </Grid>
        <Grid size={6} className={"d-row-center"}>
          <Btn
            className={"w-100p fs-1-0rem bg-black"}
            onClick={() => {
              flow.flowSave();
            }}
          >
            주문하기
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"layout-wrapper p-relative border-0 shadow-0"}>
        {extra ? (
          isAdminSection()
        ) : (
          secondStr === "find" ? (
            isFindSection()
          )
          : secondStr === "list" ? (
            isListSection()
          )
          : firstStr === "order" ? (
            isOrderSection()
          )
          : secondStr === "detail" ? (
            isDetailSection()
          )
          : secondStr === "save" ? (
            isSaveSection()
          )
          : secondStr === "update" ? (
            isUpdateSection()
          ) : (
            null
          )
        )}
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {filterNode()}
    </>
  );
};
// Filter.tsx

import { Select } from "@importContainers";
import { Div } from "@importComponents";
import { Grid, Paper, MenuItem, TablePagination } from "@importMuis";

// -------------------------------------------------------------------------------------------------
declare type FilterProps = {
  PAGING: any;
  setPAGING: any;
  COUNT: any;
}

// -------------------------------------------------------------------------------------------------
export const Filter = ({ PAGING, setPAGING, COUNT }: FilterProps) => {

  // 7. filter -------------------------------------------------------------------------------------
  const filterNode = () => {
    const filterSection = () => (
      <Grid container={true} spacing={2} className={"px-10"}>
        <Grid size={3} className={"d-col-center"}>
          <Select
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
        <Grid size={9} className={"d-col-center"}>
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
      </Grid>
    );
    // 4. return
    return (
      <Paper className={"layout-wrapper p-relative"}>
        {filterSection()}
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
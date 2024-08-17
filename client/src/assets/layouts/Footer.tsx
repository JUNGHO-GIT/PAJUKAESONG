// Footer.tsx

import { React, useLocation } from "../../import/ImportReacts.tsx";
import { Paper, Card, Grid } from "../../import/ImportMuis.tsx";

// -------------------------------------------------------------------------------------------------
export const Footer = () => {

  // 7. footer -------------------------------------------------------------------------------------
  const footerNode = () => {
    return (
      <Paper className={"flex-wrapper p-sticky bottom-0vh h-8vh radius border shadow-none"}>
        <Card className={"block-wrapper d-row w-100p shadow-none"}>
          <Grid container>
            <Grid item xs={12} className={"d-center"}>
              footer
            </Grid>
          </Grid>
        </Card>
      </Paper>
    )
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {footerNode()}
    </>
  );
};
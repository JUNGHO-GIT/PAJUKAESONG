// NoticeMain.tsx

import { React } from "../../import/ImportReacts";
import { Paper } from "../../import/ImportMuis";
import { Div } from "../../import/ImportComponents.tsx";

// -------------------------------------------------------------------------------------------------
export const NoticeMain = () => {
  return (
    <Paper className={"content-wrapper radius border shadow-none"}>
      <Div className={"block-wrapper h-min75vh"}>
        notice page
      </Div>
    </Paper>
  );
};
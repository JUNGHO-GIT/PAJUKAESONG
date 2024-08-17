// MainPage.tsx

import { React } from "../../import/ImportReacts";
import { Paper } from "../../import/ImportMuis";
import { Div } from "../../import/ImportComponents.tsx";

// -------------------------------------------------------------------------------------------------
export const MainPage = () => {
  return (
    <Paper className={"content-wrapper radius border shadow-none"}>
      <Div className={"block-wrapper h-min75vh"}>
        main page
      </Div>
    </Paper>
  );
};
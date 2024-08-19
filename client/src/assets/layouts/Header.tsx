// Header.tsx

import { useNavigate, useState } from "../../import/ImportReacts.tsx";
import { Div, Img, Icons } from "../../import/ImportComponents.tsx";
import { Paper, Card, Grid, useMediaQuery, useTheme  } from "../../import/ImportMuis.tsx";
import { logo1 } from "../../import/ImportImages.tsx";
import { SideBar } from '../../import/ImportLayouts.tsx';
import { TopNav } from '../../import/ImportLayouts.tsx';

// -------------------------------------------------------------------------------------------------
export const Header = () => {
  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // 2. toggle -------------------------------------------------------------------------------------
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 3. media query --------------------------------------------------------------------------------
  const theme = useTheme();
  const isMdOrBelow = useMediaQuery(theme.breakpoints.down("md"));

  // 5. header -------------------------------------------------------------------------------------
  const headerNode = () => {
    const logoFragment = () => (
      <Div className={"d-center"}>
        <Img
          src={logo1}
          className={"h-max50"}
          onClick={() => {
            navigate("/");
          }}
        />
      </Div>
    );
    const toggleFragment = () => (
      <Div className={"d-center"}>
        <Icons
          name={"TbHamburger"}
          className={"w-24 h-24 black m-0"}
          onClick={() => toggleSidebar()}
        />
      </Div>
    );
    return (
      <Paper className={"flex-wrapper p-sticky top-0vh radius border shadow-none p-10"}>
        <Card className={"block-wrapper d-row w-100p shadow-none"}>
          <Grid container>
            <Grid item xs={1} className={"d-left"}>
              {toggleFragment()}
            </Grid>
            <Grid item xs={11} className={"d-center"}>
              {logoFragment()}
            </Grid>
          </Grid>
        </Card>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {isMdOrBelow ? (
        <>
          {headerNode()}
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      ) : (
        <>
          <TopNav />
        </>
      )}
    </>
  );
};

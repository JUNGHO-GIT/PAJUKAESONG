// Header.tsx

import { useState, useEffect } from "react";
import { useCommon, useResponsive } from "../../import/ImportHooks.tsx";
import { dataArray } from "../../import/ImportUtils.tsx";
import { Div, Img, Icons, Hr20} from "../../import/ImportComponents.tsx";
import { Paper, Grid } from "../../import/ImportMuis.tsx";
import { Tabs, Tab, Card, Menu, MenuItem, tabsClasses } from "../../import/ImportMuis.tsx";
import { SideBar } from '../../import/ImportLayouts.tsx';
import { logo1 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, PATH, firstStr, secondStr } = useCommon();
  const { isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [width, setWidth] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (isXs) {
      setWidth("w-100p");
    }
    else if (isSm) {
      setWidth("w-15p");
    }
    else if (isMd) {
      setWidth("w-15p");
    }
    else if (isLg) {
      setWidth("w-15p");
    }
    else if (isXl) {
      setWidth("w-15p");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.title === firstStr
    ));
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedMenuItem(secondStr);
    }
  }, [PATH]);

  // 2. toggle -------------------------------------------------------------------------------------
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 5. sidebar ------------------------------------------------------------------------------------
  const sidebarNode = () => {
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

  // 7. topNav -------------------------------------------------------------------------------------
  const topNavNode = () => {
    // 1. logo
    const logoFragment = () => (
      <Img
        src={logo1}
        className={"h-max50 ms-10"}
        onClick={() => {
          navigate("/");
        }}
      />
    );
    // 2. tabs
    const tabsFragment = () => (
      dataArray.map((item, idx) => (
        <>
          <Tabs
            key={idx}
            value={item.title === selectedTab ? selectedTab : false}
            variant={"scrollable"}
            selectionFollowsFocus={true}
            scrollButtons={false}
            className={width}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            <Tab
              label={item.title}
              value={item.title}
              className={`fs-1-0rem fw-700 pointer-burgundy`}
              onClick={(e) => {
                setSelectedAnchorEl((prev) => ({
                  ...prev,
                  [item.title]: e.currentTarget,
                }));
              }}
            />
          </Tabs>
          <Menu
            anchorEl={selectedAnchorEl[item.title]}
            open={Boolean(selectedAnchorEl[item.title])}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            slotProps={{
              paper: {
                style: {
                  padding: "12px",
                },
              },
            }}
            onClose={() => {
              setSelectedAnchorEl((prev) => ({
                ...prev,
                [item.title]: null,
              }));
            }}
          >
            {item.sub.map((subItem, subIdx) => (
              <>
              {subIdx !== 0 && <Hr20 />}
              <MenuItem
                key={subIdx}
                selected={
                  selectedTab === item.title &&
                  selectedMenuItem === subItem.title
                }
                className={"fs-1-0rem pointer-burgundy"}
                onClick={() => {
                  setSelectedAnchorEl((prev) => ({
                    ...prev,
                    [item.title]: null,
                  }));
                  setSelectedTab(item.title);
                  setSelectedMenuItem(subItem.title);
                  navigate(subItem.url);
                }}
              >
                {subItem.title}
              </MenuItem>
              </>
            ))}
          </Menu>
        </>
      ))
    );
    return (
      <Paper className={"flex-wrapper p-sticky top-0vh radius border shadow-none p-10"}>
        <Card className={"block-wrapper d-row w-100p shadow-none"}>
          <Grid container>
            <Grid item xs={2} className={"d-left"}>
              {logoFragment()}
            </Grid>
            <Grid item xs={10} className={"d-right"}>
              {tabsFragment()}
            </Grid>
          </Grid>
        </Card>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {isXs ? (
        <>
          <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {sidebarNode()}
        </>
      ) : (
        <>
          {topNavNode()}
        </>
      )}
    </>
  );
};

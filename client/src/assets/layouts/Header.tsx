// Header.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useCommon, useResponsive } from "../../import/ImportHooks.tsx";
import { Div, Img, Icons, Hr20, Br15} from "../../import/ImportComponents.tsx";
import { Paper, Grid } from "../../import/ImportMuis.tsx";
import { Tabs, Tab, Card, Menu, MenuItem, tabsClasses } from "../../import/ImportMuis.tsx";
import { SideBar } from '../../import/ImportLayouts.tsx';
import { logo1 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, PATH, firstStr, secondStr, dataArray } = useCommon();
  const { isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [tabWidth, setTabWidth] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setTabWidth("");
    }
    else if (isSm) {
      setTabWidth("w-18p");
    }
    else if (isMd) {
      setTabWidth("w-15p");
    }
    else if (isLg || isXl) {
      setTabWidth("w-18p");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.titleEn === firstStr
    ));
    if (firstStr === "main") {
      setSelectedTab("");
      setSelectedTabVal("");
      setSelectedMenuItem("");
    }
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedMenuItem(secondStr);
    }
  }, [PATH]);

  // 2. toggle -------------------------------------------------------------------------------------
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 6. sidebar ------------------------------------------------------------------------------------
  const sidebarNode = () => {
    const logoSection = () => (
      <Img
        src={logo1}
        className={"pointer h-max50"}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    const toggleSection = () => (
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
              {toggleSection()}
            </Grid>
            <Grid item xs={11} className={"d-center"}>
              {logoSection()}
            </Grid>
          </Grid>
        </Card>
      </Paper>
    );
  };

  // 7. tobNav -------------------------------------------------------------------------------------
  const topNavNode = () => {
    const logoSection = () => (
      <Img
        src={logo1}
        className={"pointer h-max50 ms-10"}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    const tabsSection = () => (
      <>
        <Tabs
          value={selectedTab || false}
          variant={"scrollable"}
          selectionFollowsFocus={true}
          scrollButtons={false}
          className={"w-100p"}
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
            "& .MuiTab-root": {
              color: "black",
            },
          }}
        >
          {dataArray.map((item, idx) => (
            <Tab
              key={`tab-${idx}`}
              label={item.titleKo}
              value={item.titleEn}
              className={`pointer-burgundy fs-1-1rem ${tabWidth} ${selectedTab === item.titleEn ? "burgundy fw-600" : ""}`}
              onClick={(e) => {
                setSelectedTab(item.titleEn);
                setSelectedAnchorEl({
                  [item.titleEn]: e.currentTarget,
                });
              }}
            />
          ))}
        </Tabs>
        <Menu
          anchorEl={selectedAnchorEl[selectedTab]}
          open={Boolean(selectedAnchorEl[selectedTab])}
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
                padding: "0px 5px",
              }
            }
          }}
          onClose={() => {
            setSelectedAnchorEl((prev) => ({
              ...prev,
              [selectedTab]: null,
            }));
          }}
        >
          {dataArray.find((item) => item.titleEn === selectedTab)?.sub.map((subItem, subIdx) => (
            <MenuItem
              key={`menuItem-${subIdx}`}
              selected={selectedMenuItem === subItem.titleEn}
              className={`pointer-burgundy fs-1-1rem p-20 ${selectedTabVal === selectedTab && selectedMenuItem === subItem.titleEn ? "burgundy fw-600" : ""}`}
              onClick={() => {
                setSelectedTabVal(selectedTab);
                setSelectedMenuItem(subItem.titleEn);
                navigate(subItem.url);
                setSelectedAnchorEl((prev) => ({
                  ...prev,
                  [selectedTab]: null,
                }));
              }}
            >
              {subItem.titleKo}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
    return (
      <Paper className={"flex-wrapper p-sticky top-0vh border-bottom p-20"}>
        <Card className={`block-wrapper`}>
          {isSm ? (
            <Grid container>
              <Grid item xs={12} className={"d-center"}>
                {logoSection()}
              </Grid>
              <Br15 />
              <Grid item xs={12} className={"d-center"}>
                {tabsSection()}
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={2}>
                {logoSection()}
              </Grid>
              <Grid item xs={10} className={"d-center"}>
                {tabsSection()}
              </Grid>
            </Grid>
          )}
        </Card>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {(isXs) ? (
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

// TopNav.tsx

import { React, useState, useEffect } from "../../import/ImportReacts.tsx";
import { useNavigate, useLocation } from "../../import/ImportReacts.tsx";
import { Paper, Grid, useMediaQuery, useTheme  } from "../../import/ImportMuis.tsx";
import { Tabs, Tab, Card, Menu, MenuItem, tabsClasses } from "../../import/ImportMuis.tsx";
import { Div, Img } from "../../import/ImportComponents.tsx";
import { dataArray, log } from "../../import/ImportUtils.tsx";
import { logo1 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const TopNav = () => {

  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>(firstStr);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>(secondStr);
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

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

  // 7. topNav -------------------------------------------------------------------------------------
  const topNavNode = () => {
    // 1. logo
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
    // 2. tabs
    const tabsFragment = () => (
      dataArray.map((item, idx) => (
        <>
          <Tabs
            key={idx}
            value={selectedTab}
            variant={"scrollable"}
            selectionFollowsFocus={true}
            scrollButtons={false}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
            onChange={(event, newValue) => {
            }}
          >
            <Tab
              label={item.title}
              value={item.title}
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
            onClose={() => {
              setSelectedAnchorEl((prev) => ({
                ...prev,
                [item.title]: null,
              }));
            }}
          >
            {item.sub.map((subItem, subIdx) => (
              <MenuItem
                key={subIdx}
                selected={
                  selectedTab === item.title &&
                  selectedMenuItem === subItem.title
                }
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
            <Grid item xs={8} className={"d-center"}>
              {tabsFragment()}
            </Grid>
            <Grid item xs={2} className={"d-right"}>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {topNavNode()}
    </>
  );
};

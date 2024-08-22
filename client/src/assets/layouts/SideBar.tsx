// SideBar.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useCommon } from "../../import/ImportHooks.tsx";
import { Drawer, List, ListItem, Collapse } from "../../import/ImportMuis.tsx";
import { Icons, Div, Img, Br5, Hr30, Hr50 } from "../../import/ImportComponents.tsx";
import { dataArray } from "../../import/ImportUtils.tsx";
import { logo1 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// -------------------------------------------------------------------------------------------------
export const SideBar = (
  { isOpen, toggleSidebar }: SideBarProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, PATH, firstStr, secondStr } = useCommon();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.title === firstStr
    ));
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedListItem(secondStr);
    }
  }, [PATH]);

  // 5. sidebarNode --------------------------------------------------------------------------------
  const sidebarNode = () => {
    const sidebarFragment = () => (
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
            padding: "15px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundColor: "#f8f8f8",
          },
        }}
      >
        <Img
          src={logo1}
          className={"h-max50 m-10"}
          onClick={() => {
            navigate("/");
          }}
        />
        <Hr30 />
        {dataArray.map((item, idx) => (
          <List
            key={idx}
            component={"nav"}
          >
            {/* 메인 항목 */}
            <ListItem
              onClick={() => {
                if (selectedTab === item.title) {
                  setSelectedTab("");
                }
                else {
                  setSelectedTab(item.title);
                }
              }}
            >
              <Div className={`pointer-burgundy ${selectedTab === item.title ? "burgundy fs-1-3rem fw-600" : "fs-1-0rem"}`}>
                {item.title}
              </Div>
              {selectedTab === item.title
                ? <Icons name={"TbChevronUp"} className={"w-12 h-12 black"} />
                : <Icons name={"TbChevronDown"} className={"w-12 h-12 black"} />
              }
            </ListItem>
            {/* 하위 항목 */}
            <Collapse
              in={selectedTab === item.title}
              timeout={"auto"}
              unmountOnExit={true}
            >
              <List>
                {item.sub.map((subItem, subIdx) => (
                  <ListItem
                    key={subIdx}
                    onClick={() => {
                      setSelectedTabVal(item.title);
                      setSelectedListItem(subItem.title);
                      navigate(subItem.url);
                      toggleSidebar();
                    }}
                  >
                    <Div className={`pointer-burgundy ${selectedTabVal === item.title && selectedListItem === subItem.title ? "burgundy fs-1-0rem" : "fs-0-9rem"}`}>
                      {subItem.title}
                    </Div>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
        <Hr50 />
        <Div className={"w-100p mb-20"}>
          <Div className={"d-center"}>
            <Div className={"fs-0-8rem me-10"}>
              &copy; Copyright
            </Div>
            <Div className={"fs-0-9rem fw-700"}>
              PajuKaesong
            </Div>
          </Div>
          <Br5 />
          <Div className={"d-center"}>
            <Div className={"fs-0-8rem me-10"}>
              Designed by
            </Div>
            <Div className={"fs-0-9rem fw-700"}>
              JUNGHO
            </Div>
          </Div>
        </Div>
      </Drawer>
    );
    return (
      <>
        {sidebarFragment()}
      </>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {sidebarNode()}
    </>
  );
};
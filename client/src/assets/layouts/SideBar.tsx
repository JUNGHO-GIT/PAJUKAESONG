// SideBar.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useNavigate, useLocation } from "../../import/ImportReacts.tsx";
import { Drawer, List, ListItem, Collapse } from "../../import/ImportMuis.tsx";
import { Icons, Div } from "../../import/ImportComponents.tsx";
import { dataArray } from "../../import/ImportUtils.tsx";

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
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>(firstStr);
  const [selectedTabVal, setSelectedTabVal] = useState<string>(firstStr);
  const [selectedListItem, setSelectedListItem] = useState<string>(secondStr);

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

  // 10. return ------------------------------------------------------------------------------------
  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={toggleSidebar}
    >
      {dataArray.map((item, idx) => (
        <List
          key={idx}
          component={"nav"}
          className={"w-240"}
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
            <Div className={`pointer fs-1-2rem ${selectedTab === item.title ? "burgundy fs-1-4rem" : ""}`}>
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
                  <Div className={`pointer fs-1-0rem ${selectedTabVal === item.title && selectedListItem === subItem.title ? "burgundy" : ""}`}>
                    {subItem.title}
                  </Div>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </Drawer>
  );
};

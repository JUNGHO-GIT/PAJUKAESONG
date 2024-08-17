// SideBar.tsx

import { React, useState, useNavigate } from "../../import/ImportReacts.tsx";
import { Drawer, List, ListItem, ListItemText, Collapse } from "../../import/ImportMuis.tsx";
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

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedMainIdx, setSelectedMainIdx] = useState<number | null>(null);
  const [selectedSubIdx, setSelectedSubIdx] = useState<{ [key: number]: number | null }>({});

  // 10. return ------------------------------------------------------------------------------------
  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={toggleSidebar}
    >
      <List>
        {dataArray.map((obj, idx) => (
          <Div key={idx}>
            {/* 메인 항목 표시 */}
            <ListItem
              className={`pointer ${selectedMainIdx === idx ? "bg-grey" : ""}`}
              onClick={() => {
                if (selectedMainIdx === idx) {
                  setSelectedMainIdx(null);
                }
                else {
                  setSelectedMainIdx(idx);
                }
              }}
            >
              <ListItemText primary={obj.title} />
              {selectedMainIdx === idx
                ? <Icons name={"TbChevronUp"} className={"w-12 h-12 black"} />
                : <Icons name={"TbChevronDown"} className={"w-12 h-12 black"} />
              }
            </ListItem>
            {/* 하위 항목 표시 */}
            <Collapse
              in={selectedMainIdx === idx}
              timeout={"auto"}
              unmountOnExit={true}
            >
              <List>
                {obj.sub.map((subItem, subIdx) => (
                  <ListItem
                    key={subIdx}
                    className={`pointer ${selectedSubIdx[idx] === subIdx ? "bg-grey" : ""}`}
                    onClick={() => {
                      setSelectedSubIdx((prev) => ({
                        ...prev,
                        [idx]: subIdx,
                      }));
                      navigate(subItem.url);
                      toggleSidebar();
                    }}
                  >
                    <ListItemText primary={subItem.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Div>
        ))}
      </List>
    </Drawer>
  );
};

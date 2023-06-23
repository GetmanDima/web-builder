import { PropertyTabsNavItem } from "./TabNavItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import {
  selectedElementSelector,
  setActivePropertyTab,
} from "@entities/Page/model/pageReducer";

export const TabNav = () => {
  const topItems = [
    {
      name: "Состояние",
      tab: "state",
      sources: ["component"],
    },
    {
      name: "Стили",
      tab: "style",
      sources: ["element"],
    },
    {
      name: "Параметры",
      tab: "params",
      sources: ["element"],
    },
    {
      name: "События",
      tab: "events",
      sources: ["element"],
    },
    {
      name: "Код",
      tab: "code",
      sources: ["element"],
    },
  ];

  const bottomItems = [
    {
      name: "Дерево элементов",
      tab: "tree",
    },
    {
      name: "Состояние",
      tab: "global",
    },
  ];

  const dispatch = useAppDispatch();

  const selectedElement = useSelector(selectedElementSelector);
  const activeTab = useSelector(
    (state: RootState) => state.page.activePropertyTab
  );

  const topItemComponents = topItems
    .filter((item) => item.sources.includes(selectedElement?.type ?? ""))
    .map((item) => (
      <PropertyTabsNavItem
        key={item.tab}
        item={item}
        active={item.tab === activeTab}
        onClick={() => toggleActiveTab(item.tab)}
      />
    ));

  const bottomItemComponents = bottomItems.map((item) => (
    <PropertyTabsNavItem
      key={item.tab}
      item={item}
      active={item.tab === activeTab}
      onClick={() => toggleActiveTab(item.tab)}
    />
  ));

  function toggleActiveTab(tab: string) {
    if (tab === activeTab) {
      dispatch(setActivePropertyTab());
    } else {
      dispatch(setActivePropertyTab(tab));
    }
  }

  return (
    <div className='w-[25px] h-full ml-auto flex flex-col bg-gray-700'>
      {topItemComponents}
      <div className='mt-auto flex flex-col'>{bottomItemComponents}</div>
    </div>
  );
};

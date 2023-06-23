import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@app";
import { StyleTab, EventsTab, ParamsTab, GlobalStateTab, CodeTab } from "./tabs";

export const PageTabs = () => {
  const tabComponentMatch: {[key: string]: ReactElement | undefined} = {
    global: <GlobalStateTab />,
    style: <StyleTab />,
    events: <EventsTab />,
    params: <ParamsTab />,
    code: <CodeTab />
  }

  const activeTab = useSelector((state: RootState) => state.page.activePropertyTab) ?? '';
  let tabComponent = tabComponentMatch[activeTab] ?? null;

  return (
    <div>
      {tabComponent}
    </div>
  );
};

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  clearCurrPageId,
  setCurrPageId,
} from "@entities/Page/model/pageReducer";
import { PageArea } from "@widgets/PageArea";
import { PageTabs } from "@widgets/PageTabs";
import { TabNav } from "@widgets/TabNav";
import { useParams } from "react-router";
import { RootState, useAppDispatch } from "@app";
import { projectAPI } from "@shared/api";
import { setPage } from "@entities/App/model/appReducer";

export const FrontPageEditor = () => {
  const dispatch = useAppDispatch();
  const { projectId, pageId } = useParams();
  const { currProjectId } = useSelector((state: RootState) => state.project);
  const [getOneProject] = projectAPI.useGetOneProjectMutation();

  useEffect(() => {
    dispatch(setPage("pageEditor"));

    if (!projectId || !pageId) {
      return;
    }

    if (currProjectId !== projectId) {
      getOneProject({ projectId });
    }

    dispatch(setCurrPageId(+pageId));

    return () => {
      dispatch(clearCurrPageId());
    };
  });

  return (
    <div className='h-full flex' style={{ height: "calc(100vh - 58px)" }}>
      <div className='w-full bg-gray-300 overflow-scroll'>
        <div className='w-[1600px]'></div>
        <PageArea />
      </div>
      <div className='flex'>
        <PageTabs />
        <TabNav />
      </div>
    </div>
  );
};

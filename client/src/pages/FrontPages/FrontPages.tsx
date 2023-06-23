import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { PageForm } from "@widgets/PageForm";
import { useNavigate, useParams } from "react-router";
import { PageElement } from "@shared/model/type/front.type";
import { OutListItem } from "@shared/ui";
import {
  addPage,
  lastElementIdSelector,
  removeElement,
  removePage as frontRemovePage,
  setElement,
} from "@entities/Front/model/frontReducer";
import { defaultPageElement } from "./lib";
import { setCurrPageId } from "@entities/Page/model/pageReducer";
import { projectAPI } from "@shared/api";
import { setPage } from "@entities/App/model/appReducer";

export const FrontPages = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getOneProject] = projectAPI.useGetOneProjectMutation();

  const {projectId} = useParams();

  const {currProjectId} = useSelector((state: RootState) => state.project);
  const { pages, elements = {} } = useSelector((state: RootState) => state.front);
  const lastElementId = useSelector(lastElementIdSelector);

  const [selectedPageId, setSelectedPageId] = useState<number>();

  useEffect(() => {
    dispatch(setPage('pages'));

    if (!projectId || currProjectId === projectId) {
      return;
    }

    getOneProject({projectId});
  }, [projectId, currProjectId])

  const itemComponents = pages.map((pageId) => {
    const element = elements[pageId] as PageElement;
    
    return (
      <OutListItem
        className='w-[600px] mb-[10px]'
        key={pageId}
        onEditClick={() => {
          setSelectedPageId(pageId);
        }}
        onOutClick={() => {
          console.debug('pageId', pageId);
          dispatch(setCurrPageId(pageId));
          navigate(`/projects/${projectId}/pages/${pageId}/editor`);
        }}
      >
        <div className='flex'>
          <div className='mr-[20px] text-[16px]'>{element.config.title}</div>
          <div className='text-[16px]'>{element.config.path}</div>
        </div>
      </OutListItem>
    );
  });

  function cancelPage() {
    setSelectedPageId(undefined);
  }

  function removePage() {
    if (selectedPageId) {
      dispatch(removeElement(selectedPageId));
      dispatch(frontRemovePage(selectedPageId));
      setSelectedPageId(undefined);
    }
  }

  function savePage(data: { title: string; path: string }) {
    if (selectedPageId) {
      const element = elements[selectedPageId];

      dispatch(
        setElement({
          ...element,
          config: { ...defaultPageElement.config, ...data },
        })
      );
    } else {
      const newElementId = lastElementId + 1;

      dispatch(
        setElement({
          ...defaultPageElement,
          id: newElementId,
          config: { ...defaultPageElement.config, ...data },
        })
      );
  
      dispatch(addPage(newElementId));
    }
  }

  const formData = selectedPageId ? (elements[selectedPageId] as PageElement)?.config : undefined;

  return (
    <div className='w-[1200px] mt-[20px] mx-auto flex justify-between'>
      <PageForm
        data={formData}
        onSave={savePage}
        onRemove={removePage}
        onCancel={cancelPage}
      />
      <div>{itemComponents}</div>
    </div>
  );
};

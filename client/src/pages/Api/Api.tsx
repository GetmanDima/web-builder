import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@app";
import { RequestForm } from "@widgets/RequestForm";
import { RequestList } from "@widgets/RequestList";
import { RequestContent } from "@widgets/RequestContent";
import { RequestActionModal } from "@widgets/RequestActionModal/RequestActionModal";
import {
  currRequestSelector,
  setCurrRequestAction,
} from "@entities/Api/model/apiReducer";
import { setPage } from "@entities/App/model/appReducer";
import { projectAPI } from "@shared/api";
import { Button } from "@shared/ui";

export const Api = () => {
  const dispatch = useAppDispatch();
  const [getOneProject] = projectAPI.useGetOneProjectMutation();

  const {projectId} = useParams();

  const request = useSelector(currRequestSelector);
  const action = useSelector((state: RootState) => state.api.currRequestAction);
  const {currProjectId} = useSelector((state: RootState) => state.project);

  const maxActionId =
    request?.actions.reduce((res, a) => (a.id > res ? a.id : res), 1) ?? 1;


  useEffect(() => {
    dispatch(setPage('api'));

    if (!projectId || currProjectId === projectId) {
      return;
    }

    getOneProject({projectId});
  }, [projectId, currProjectId]);


  return (
    <>
      <div className='mt-[20px] w-[1200px] mx-auto'>
        <div className='flex justify-between'>
          <div>
            <RequestForm />
            <div className='mt-[20px]'>
              <RequestList />
            </div>
          </div>
          <div>
            {request ? (
              <>
                <RequestContent request={request} />
                <div className='mt-[20px] flex justify-end'>
                  <Button
                    text='Добавить'
                    onClick={() => {
                      dispatch(
                        setCurrRequestAction({
                          id: maxActionId + 1,
                          var: "",
                          table: "",
                          type: "",
                        })
                      );
                    }}
                  />
                </div>
              </>
            ) : (
              <div className='text-[16px]'>
                Выберите запрос
              </div>
            )}
          </div>
        </div>
      </div>
      <RequestActionModal
        visible={!!action}
        closeModal={() => dispatch(setCurrRequestAction(undefined))}
      />
    </>
  );
};

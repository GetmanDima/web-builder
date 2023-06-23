import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";
import { TableForm } from "@widgets/TableForm";
import { TableList } from "@widgets/TableList/TableList";
import { projectAPI } from "@shared/api";

export const Db = () => {
  const dispatch = useAppDispatch();
  const [getOneProject] = projectAPI.useGetOneProjectMutation();

  const {projectId} = useParams();

  const {currProjectId} = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(setPage('db'));

    if (!projectId || currProjectId === projectId) {
      return;
    }

    getOneProject({projectId});
  }, [projectId, currProjectId]);

  return (
    <div className="mt-[20px] w-[1200px] mx-auto">
      <div className="flex justify-between">
        <TableForm />
        <TableList selectTable={() => {}}/>
      </div>
    </div>
  )
}

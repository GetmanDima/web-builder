import { useState, useEffect } from "react";
import { ProjectForm } from "@widgets/ProjectForm";
import { ProjectList } from "@widgets/ProjectList";
import { useAppDispatch } from "@app";
import { setProjects } from "@entities/Project/model/projectReducer";
import { projectAPI } from "@shared/api";
import { ErrorModal } from "@shared/ui";
import { setPage } from "@entities/App/model/appReducer";

export const Projects = () => {
  const dispatch = useAppDispatch();
  const [getProjects] = projectAPI.useGetProjectsMutation();
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    dispatch(setPage('projects'));
    
    getProjects({})
      .unwrap()
      .then((payload) => {
        dispatch(setProjects(payload.projects.map((p) => {
          return {
            id: p._id,
            name: p.name,
            settings: p.settings,
            createdAt: p.createdAt
          }
        })));
      })
      .catch((e) => {
        setServerError("Произошла ошибка при получении проектов");
      });
  }, []);

  return (
    <>
      <div className="mt-[20px] w-[1200px] mx-auto">
        <div className="flex justify-between">
          <ProjectForm />
          <ProjectList />
        </div>
      </div>
      <ErrorModal
        visible={!!serverError}
        className="w-[250px]"
        closeModal={() => setServerError("")}
      >
        {serverError}
      </ErrorModal>
    </>
  );
};

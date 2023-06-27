import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProjectForm } from "@widgets/ProjectForm";
import { ProjectList } from "@widgets/ProjectList";
import { RootState, useAppDispatch } from "@app";
import { setProjects } from "@entities/Project/model/projectReducer";
import { setPage } from "@entities/App/model/appReducer";
import { projectAPI } from "@shared/api";
import { Button, ErrorModal, SelectField } from "@shared/ui";

export const Projects = () => {
  const dispatch = useAppDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);

  const [getProjects] = projectAPI.useGetProjectsMutation();
  const [generateCode] = projectAPI.useGenerateCodeMutation();

  const [serverError, setServerError] = useState("");
  const [selectedProject, setSelectedProject] = useState('');

  const projectItems = projects.map((project) => {
    return {
      title: project.name,
      value: project.id
    }
  })

  useEffect(() => {
    dispatch(setPage("projects"));

    getProjects({})
      .unwrap()
      .then((payload) => {
        dispatch(
          setProjects(
            payload.projects.map((p) => {
              return {
                id: p._id,
                name: p.name,
                settings: p.settings,
                createdAt: p.createdAt,
              };
            })
          )
        );
      })
      .catch((e) => {
        setServerError("Произошла ошибка при получении проектов");
      });
  }, []);

  return (
    <>
      <div className='mt-[20px] w-[1200px] mx-auto'>
        <div className='flex justify-between'>
          <div>
            <ProjectForm />
            <div className="mt-[20px] flex justify-between items-center">
              <SelectField
                items={projectItems}
                selected={selectedProject}
                onSelectValue={(v) => setSelectedProject(v as string)}
                className="mr-[10px]"
              />
              <Button text="Сгенерировать код" onClick={() => {
                generateCode({projectId: selectedProject});
              }}/>
            </div>
          </div>
          <ProjectList />
        </div>
      </div>
      <ErrorModal
        visible={!!serverError}
        className='w-[250px]'
        closeModal={() => setServerError("")}
      >
        {serverError}
      </ErrorModal>
    </>
  );
};

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@app";
import { Project } from "@shared/model/type/project.type";
import { ProjectItem } from "./ProjectItem/ProjectItem";

export const ProjectList = () => {
  const navigate = useNavigate();

  const projects = useSelector((state: RootState) => state.project.projects);

  function selectProject(project: Project) {
    navigate(`/projects/${project.id}/pages`);
  }

  return (
    <div className='w-[660px] flex flex-wrap -my-[10px]'>
      {projects.map((project) => (
        <div key={project.id} className="mx-[10px] my-[10px]">
          <ProjectItem project={project} onSelect={() => selectProject(project)}/>
        </div>
      ))}
    </div>
  );
};

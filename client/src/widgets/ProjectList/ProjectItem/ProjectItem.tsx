import { dateToString } from "@shared/lib";
import { Project } from "@shared/model/type/project.type";

interface ProjectItemProps {
  project: Project;
  onSelect: () => void;
}

export const ProjectItem = ({ project, onSelect }: ProjectItemProps) => {
  const dateText = dateToString(new Date(project.createdAt), 'DD.MM.YYYY hh:mm');

  return (
    <div
      className='cursor-pointer w-[140px] h-[140px] relative flex justify-center items-center rounded bg-gray-900 text-white text-[16px]'
      onClick={onSelect}
    >
      {project.name}
      <div className="absolute top-[4px] left-[4px]">{dateText}</div>
    </div>
  );
};

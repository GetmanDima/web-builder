import { LibElement } from "@shared/model/type/front.type";
import { frontLibElements } from "@shared/model/frontLibElements";
import { LibButton } from "../LibButton/LibButton";

interface ElLibListProps {
  createElement: (el: LibElement) => void;
}

export const ElLibList = ({ createElement }: ElLibListProps) => {
  const elLibElements = frontLibElements.map((el) => (
    <div key={el.id} className='mr-[10px]'>
      <LibButton element={el} onClick={() => createElement(el)} />
    </div>
  ));

  return (
    <div>
      <div className='w-full flex flex-wrap'>{elLibElements}</div>
    </div>
  );
};

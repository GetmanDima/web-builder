import { useState } from "react";
import { Form, Button, Group, TextField } from "@shared/ui";
import { RootState, useAppDispatch } from "@app";
import { addProject } from "@entities/Project/model/projectReducer";
import { projectAPI } from "@shared/api";
import { hasErrors } from "@shared/lib";
import { ErrorModal, SuccessModal } from "@shared/ui";
import { useSelector } from "react-redux";

export const ProjectForm = () => {
  const dispatch = useAppDispatch();
  
  const [createProject] = projectAPI.useCreateProjectMutation();

  const {projects} = useSelector((state: RootState) => state.project)

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errors, setErrors] = useState({
    name: false
  });
  const [serverError, setServerError] = useState('');

  const validate = () => {
    return {
      name: name.length < 3 && !!projects.find((t) => t.name === name)
    };
  };

  const saveProject = () => {
    const newErrors = validate();
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    setLoading(true);

    createProject({name})
      .unwrap()
      .then((payload) => {
        setLoading(false);
        setSuccessVisible(true);
        dispatch(addProject({
          id: payload.project._id,
          name,
          createdAt: payload.project.createdAt
        }));
      })
      .catch((e) => {
        setLoading(false);
        setServerError("Произошла ошибка при создании проекта");
      });
  }

  const changeName = (newName: string) => {
    setErrors({ ...errors, name: false });
    setName(newName);
  };

  return (
    <>
      <Form title='Новый проект' className="h-[180px] !py-[10px]">
        <Group className='mb-[20px]'>
          <div className='mr-[20px] text-[16px]'>Название</div>
          <TextField
            error={errors.name}
            value={name}
            className='!w-[300px]'
            onChangeValue={changeName}
          />
        </Group>
        <div className='mt-[30px] flex justify-end'>
          <Button text='Сохранить' loading={loading} disabled={loading} onClick={saveProject} />
        </div>
      </Form>
      <ErrorModal
        visible={!!serverError}
        className="w-[250px]"
        closeModal={() => setServerError("")}
      >
        {serverError}
      </ErrorModal>
      <SuccessModal
        visible={successVisible}
        className="w-[250px]"
        closeModal={() => setSuccessVisible(false)}
      >
        Проект создан
      </SuccessModal>
    </>
  );
};

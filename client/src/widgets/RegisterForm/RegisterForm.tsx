import cn from "classnames";
import { useState } from "react";
import { userAPI } from "@shared/api";
import { hasErrors } from "@shared/lib";
import { Button, TextField, Group, ErrorModal, SuccessModal } from "@shared/ui";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  className?: string;
}

export const RegisterForm = ({ className }: RegisterFormProps) => {
  const [register] = userAPI.useRegisterMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeatedPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const validate = () => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return {
      email: !emailRegExp.test(email),
      password: password.length < 3,
      repeatedPassword: repeatedPassword !== password,
    };
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (hasErrors(newErrors)) {
      return;
    }

    setLoading(true);

    register({ email, password })
      .unwrap()
      .then(() => {
        setLoading(false);
        setSuccessVisible(true);
      })
      .catch((e) => {
        setLoading(false);
        setServerError("Произошла ошибка при попытке регистрации");
      });
  };

  const changeEmail = (newEmail: string) => {
    setErrors({ ...errors, email: false });
    setEmail(newEmail);
  };

  const changePassword = (newPassword: string) => {
    setErrors({ ...errors, password: false });
    setPassword(newPassword);
  };

  const changeRepeatedPassword = (newPassword: string) => {
    setErrors({ ...errors, repeatedPassword: false });
    setRepeatedPassword(newPassword);
  };

  return (
    <>
      <div
        className={cn(
          "bg-gray-700 py-[20px] px-[30px] rounded text-white",
          className
        )}
      >
        <div className='text-center text-[18px] mb-[30px]'>Регистрация</div>
        <form onSubmit={onSubmit}>
          <Group className='mb-4'>
            <label className='block w-[150px] text-[15px]' htmlFor='email'>
              Email:
            </label>
            <TextField
              id='email'
              error={errors.email}
              value={email}
              onChangeValue={changeEmail}
            />
          </Group>
          <Group className='mb-4'>
            <label className='block w-[150px] text-[15px]' htmlFor='password'>
              Пароль:
            </label>
            <TextField
              id='password'
              type='password'
              error={errors.password}
              value={password}
              onChangeValue={changePassword}
            />
          </Group>
          <Group className='mb-4'>
            <label className='block w-[150px] text-[15px]' htmlFor='r-password'>
              Подтвердите пароль:
            </label>
            <TextField
              id='r-password'
              type='password'
              error={errors.repeatedPassword}
              value={repeatedPassword}
              onChangeValue={changeRepeatedPassword}
            />
          </Group>
          <div className='flex justify-end mt-4'>
            <Button
              type='submit'
              text='Зарегистрироваться'
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      </div>
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
        <div>
          <span className="text-[15px]">Регистрация прошла успешно. </span>
          <span className="text-[15px]">Для авторизации перейдите по <Link to="/login" className="text-[15px] text-white underline">ссылке</Link></span>
        </div>
      </SuccessModal>
    </>
  );
};

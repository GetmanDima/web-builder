import cn from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router";
import { userAPI } from "@shared/api";
import { hasErrors } from "@shared/lib";
import { Button, TextField, Group, ErrorModal } from "@shared/ui";
import { useAppDispatch } from "@app";
import { updateAuth } from "@entities/User/model/userReducer";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = userAPI.useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return {
      email: !emailRegExp.test(email),
      password: password.length < 3,
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

    login({email, password})
      .unwrap()
      .then((payload) => {
        setLoading(false);
        localStorage.setItem('token', payload.accessToken);
        dispatch(updateAuth({token: payload.accessToken, isAuth: true}));
        navigate('/');
      })
      .catch((e) => {
        console.debug(e);
        setLoading(false);
        setServerError("Произошла ошибка при попытке авторизации");
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

  return (
    <>
      <div
        className={cn(
          "bg-gray-700 py-[20px] px-[30px] rounded text-white",
          className
        )}
      >
        <div className='text-center text-[18px] mb-[30px]'>Авторизация</div>
        <form onSubmit={onSubmit}>
          <Group className='mb-4'>
            <label className='block w-[80px] text-[15px]' htmlFor='email'>
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
            <label className='block w-[80px] text-[15px]' htmlFor='password'>
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
          <div className='flex justify-end mt-4'>
            <Button
              type='submit'
              text='Войти'
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
    </>
  );
};

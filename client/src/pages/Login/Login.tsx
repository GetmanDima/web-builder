import { useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";
import { LoginForm } from "@widgets/LoginForm";
import { useEffect } from "react";

export const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage('login'));
  })

  return (
    <div className="flex justify-center items-center" style={{minHeight: 'calc(100vh - 58px)'}}>
      <LoginForm className="w-[430px]" />
    </div>
  );
};

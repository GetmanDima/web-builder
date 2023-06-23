import { useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";
import { RegisterForm } from "@widgets/RegisterForm"
import { useEffect } from "react";

export const Register = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage('register'));
  })

  return (
    <div className="flex justify-center items-center" style={{minHeight: 'calc(100vh - 58px)'}}>
      <RegisterForm className="w-[500px]"/>
    </div>
  )
}

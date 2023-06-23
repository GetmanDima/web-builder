import { useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";
import { useEffect } from "react";

export const NotFound = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPage('notFound'));
  })

  return (
    <div className="flex justify-center items-center" style={{minHeight: 'calc(100vh - 58px)'}}>
      <h2 className="text-[30px] text-black">404 | Not found</h2>
    </div>
  )
}

import { useState, useEffect } from "react";
import { useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";
import { fileAPI } from "@shared/api";
import { ErrorModal } from "@shared/ui";
import { serverUrl } from "@shared/constant";

export const FileStorage = () => {
  const dispatch = useAppDispatch();
  const [getFiles] = fileAPI.useGetFilesMutation();
  const [files, setFiles] = useState<any[]>([]);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    dispatch(setPage("files"));

    getFiles({})
      .unwrap()
      .then((payload) => {
        setFiles(payload.files);
      })
      .catch((e) => {
        setServerError("Произошла ошибка при получении файлов");
      });
  }, []);

  return (
    <>
      <div className='mt-[20px] w-[1200px] mx-auto'>
        <div className='flex justify-between'>
          <div className='w-[660px] flex flex-wrap -my-[10px]'>
            {files.map((file) => (
              <div key={file._id} className='mx-[10px] my-[10px]'>
                <div
                  className='cursor-pointer w-[140px] h-[140px] relative flex justify-center items-center rounded bg-gray-900 text-white text-[16px]'
                  onClick={() => {
                    window.open(serverUrl + file.url, '_blank');
                  }}
                >
                  {file.name.slice(0, 10) + '...'}
                  <div className='absolute top-[4px] left-[4px]'>
                    {file.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

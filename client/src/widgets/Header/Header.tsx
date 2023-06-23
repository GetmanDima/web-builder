import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@shared/ui";
import { MainNav } from "./MainNav";
import { useSelector } from "react-redux";
import { RootState } from "@app";
import { currPageSelector } from "@entities/Page/model/pageReducer";
import { Link } from "react-router-dom";
import { projectAPI } from "@shared/api";

export const Header = () => {
  const [updateConfig] = projectAPI.useUpdateConfigMutation();

  const { page: appPage } = useSelector((state: RootState) => state.app);
  const { currProjectId } = useSelector((state: RootState) => state.project);
  const frontConfig = useSelector((state: RootState) => state.front);
  const dbConfig = useSelector((state: RootState) => state.db);
  const { requests } = useSelector((state: RootState) => state.api);
  const { isAuth } = useSelector((state: RootState) => state.user);
  const currFrontPage = useSelector(currPageSelector);

  let configType: "frontend" | "db" | "api";
  let saveText: string = "Сохранить";

  if (appPage === "pages" || appPage === "pageEditor") {
    configType = "frontend";
    saveText = "Сохранить фронтенд";
  }

  if (appPage === "db") {
    configType = "db";
    saveText = "Сохранить БД";
  }

  if (appPage === "api") {
    configType = "api";
    saveText = "Сохранить API";
  }

  const saveConfig = () => {
    if (!currProjectId) {
      return;
    }

    const configMap = {
      frontend: frontConfig,
      db: dbConfig,
      api: {
        requests,
      },
    };

    updateConfig({
      config: configType,
      projectId: currProjectId,
      data: configMap[configType],
    });
  };

  return (
    <div className='h-[58px] px-[25px] flex items-center border-b border-b-black bg-gray-800'>
      <Link
        to='/'
        className='cursor-pointer mr-[100px] text-white text-[20px] no-underline'
      >
        WebBuilder
      </Link>
      <MainNav />
      {isAuth && (
        <div className='ml-auto flex items-center'>
          {currFrontPage && (
            <div className='mr-[20px] text-[15px] text-white'>
              {currFrontPage.config?.title}
            </div>
          )}
          {currProjectId && (
            <>
              <Button
                text='Просмотр'
                className='mr-[10px]'
                onClick={() => {
                  window.open(`/projects/${currProjectId}/preview`, "_blank");
                }}
              />
              <Button text="Синхронизация" className="mr-[10px]" onClick={() => {}} />
              <Button text={saveText} onClick={saveConfig} />
            </>
          )}
          <AccountCircleIcon style={{ fill: "white", marginLeft: '10px' }} />
        </div>
      )}
    </div>
  );
};

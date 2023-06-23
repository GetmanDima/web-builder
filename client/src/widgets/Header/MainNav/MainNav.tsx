import { MainNavItem } from "./MainNavItem";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@app";

export const MainNav = () => {
  const navigate = useNavigate();
  const {page} = useSelector((state: RootState) => state.app);
  const {isAuth} = useSelector((state: RootState) => state.user);
  const {currProjectId} = useSelector((state: RootState) => state.project);

  let items: any[] = [];

  if (isAuth && currProjectId) {
    items = [
      {
        id: 'pages',
        name: "Страницы",
        link: `/projects/${currProjectId}/pages`,
      },
      {
        id: 'db',
        name: "База данных",
        link: `/projects/${currProjectId}/db`,
      },
      {
        id: 'api',
        name: "API",
        link: `/projects/${currProjectId}/api`,
      },
    ]
  } else if (isAuth) {
    items = [
      {
        id: 'projects',
        name: "Проекты",
        link: `/`,
      },
      {
        id: 'storage',
        name: "Файловое хранилище",
        link: `/storage`,
      },
      {
        id: 'settings',
        name: "Настройки",
        link: `/settings`,
      },
    ]
  } else {
    items = [
      {
        id: 'login',
        name: "Авторизация",
        link: "/login",
      },
      {
        id: 'register',
        name: "Регистрация",
        link: "/register",
      },
    ]
  }

  const itemComponents = items.map((item) => (
    <div key={item.id} className='mr-[35px]'>
      <MainNavItem
        item={item}
        active={item.id === page}
        onClick={() => {
          navigate(item.link);
        }}
      />
    </div>
  ));

  return <div className='flex'>{itemComponents}</div>;
};

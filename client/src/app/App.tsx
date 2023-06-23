import { Suspense, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store/store";
import { routes, authRoutes } from "@pages";
import { updateAuth } from "@entities/User/model/userReducer";
import { ProviderWrapper } from "./ProviderWrapper";
import "@assets/style/index.css";
import "antd/dist/reset.css";
import { Header } from "@widgets/Header";
import { Route, Routes, useLocation } from "react-router";
import { NotFound } from "@pages/NotFound/NotFound";
import { ErrorModal, PageLoader } from "@shared/ui";
import { setError } from "@entities/App/model/appReducer";
import { clearFront } from "@entities/Front/model/frontReducer";
import { clearCurrProjectId } from "@entities/Project/model/projectReducer";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuth } = useSelector((state: RootState) => state.user);
  const { page, loading, error } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const storageToken = localStorage.getItem("token");

    if (storageToken) {
      dispatch(updateAuth({ token: storageToken, isAuth: true }));
    } else {
      dispatch(updateAuth({ token: "", isAuth: false }));
    }
  });

  useEffect(() => {
    const projectRegex = /\/projects\/.*?/;

    if (!projectRegex.test(location.pathname)) {
      dispatch(clearCurrProjectId());
      dispatch(clearFront());
    }
  }, [location]);

  const routeComponents = useMemo(() => {
    const resRoutes = isAuth ? authRoutes : routes;

    return resRoutes.map((route) => {
      return (
        <Route path={route.path} element={route.element} key={route.path} />
      );
    });
  }, [isAuth]);

  const routesContent = (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routeComponents}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );

  const content = page === 'preview' ? routesContent : (
    <div className='max-w-screen'>
      <Header />
      <div className='content max-w-screen'>{routesContent}</div>
    </div>
  );

  return (
    <>
      {content}
      <ErrorModal
        visible={!!error}
        className='w-[250px]'
        closeModal={() => dispatch(setError(""))}
      >
        {error}
      </ErrorModal>
      {loading && <PageLoader />}
    </>
  );
};

const ProviderApp = () => (
  <ProviderWrapper>
    <App />
  </ProviderWrapper>
);

export default ProviderApp;

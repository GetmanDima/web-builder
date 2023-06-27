import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAPI, projectAPI, fileAPI } from "@shared/api";
import { frontReducer } from "@entities/Front";
import { userReducer } from "@entities/User";
import { pageReducer } from "@entities/Page";
import { projectReducer } from "@entities/Project";
import { appReducer } from "@entities/App";
import { dbReducer } from "@entities/Db";
import { apiReducer } from "@entities/Api";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  front: frontReducer,
  page: pageReducer,
  project: projectReducer,
  db: dbReducer,
  api: apiReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
  [fileAPI.reducerPath]: fileAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, projectAPI.middleware, fileAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

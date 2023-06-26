import { RootState } from "@app";
import { setApi } from "@entities/Api/model/apiReducer";
import { setError, setLoading } from "@entities/App/model/appReducer";
import { setDb } from "@entities/Db/model/dbReducer";
import { setFront } from "@entities/Front/model/frontReducer";
import { setCurrProjectId } from "@entities/Project/model/projectReducer";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { serverUrl } from "@shared/constant";

export interface CreateProjectRequest {
  name: string;
}

export interface BasicProjectResponse {
  _id: string;
  name: string;
  user: string;
  settings?: any;
  createdAt: string;
}

export interface CreateProjectResponse {
  project: BasicProjectResponse;
}

export interface GetProjectsResponse {
  projects: BasicProjectResponse[];
}

export interface GetOneProjectResponse {
  project: BasicProjectResponse & {
    frontendConfig: any;
    apiConfig: any;
    dbConfig: any;
  };
}

export interface GetOneProjectRequest {
  projectId: string;
}

export interface UpdateConfigRequest {
  config: 'frontend' | 'db' | 'api',
  projectId: string;
  data: any;
}

export const projectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;
      headers.set("Authorization", `Bearer ${state.user.token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    createProject: build.mutation<CreateProjectResponse, CreateProjectRequest>({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: data,
      }),
    }),
    getProjects: build.mutation<GetProjectsResponse, {}>({
      query: () => ({
        url: `/projects`,
        method: "GET",
      }),
    }),
    getOneProject: build.mutation<GetOneProjectResponse, GetOneProjectRequest>({
      query: (data) => ({
        url: `/projects/${data.projectId}`,
        method: "GET",
        params: {
          configs: ["frontend", "api", "db"],
        },
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const response = await queryFulfilled;

          const dbConfig = response.data.project.dbConfig;
          const apiConfig = response.data.project.apiConfig;
          const frontConfig = response.data.project.frontendConfig;
      
          dispatch(setCurrProjectId(request.projectId));
          dispatch(setApi(apiConfig))
          dispatch(setDb(dbConfig));
          dispatch(setFront(frontConfig));
          dispatch(setLoading(false));
        } catch {
          dispatch(setError("Произошла ошибка при получении проекта"));
        }

        dispatch(setLoading(false));
      },
    }),
    updateConfig: build.mutation<{}, UpdateConfigRequest>({
      query: (data) => ({
        url: `/projects/${data.projectId}/configs/${data.config}`,
        method: "PATCH",
        body: {
          [`${data.config}Config`]: data.data,
        },
      }),
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          dispatch(setError("Произошла ошибка при сохранении"));
        }
      },
    }),
  }),
});

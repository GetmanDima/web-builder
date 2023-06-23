import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app";

export interface ApiSlice {
  requests: ApiRequest[];
  currRequestName?: string;
  currRequestAction?: ApiRequestAction;
}

export interface ApiRequest {
  name: string;
  params: string[];
  actions: ApiRequestAction[];
  response: {
    status: number;
    vars: string[];
  };
}

export interface ApiRequestAction {
  id: number,
  var: string;
  type: string;
  table: string;
  [key: string]: any
}

export interface ApiRequestGetAction extends ApiRequestAction {
  fields: string[];
  join?: {
    table: string,
    fields: string[]
    localField: '',
    foreignField: ''
  },
  conditions: ApiActionCondition[]
}

export interface ApiRequestCreateAction extends ApiRequestAction {
  fieldsMap: {
    [fieldName: string]: {
      source: string,
      value: string
    }
  }
}

export interface ApiRequestEditAction extends ApiRequestCreateAction {
  conditions: ApiActionCondition[]
}

export interface ApiRequestRemoveAction extends ApiRequestAction {
  conditions: ApiActionCondition[]
}

export interface ApiActionCondition {
  id: number,
  joinOperator: string,
  field: string,
  sign: string,
  source: string,
  value: string
}

const initialState: ApiSlice = {
  requests: [
    {
      name: "Получить пользователя с проектами",
      params: ["userId"],
      actions: [
        {
          id: 1,
          var: "var1",
          type: "get",
          table: "users",
          fields: ["email"],
          join: {
            table: "projects",
            fields: ["name", "userId"],
            conditions: [
              {
                id: 1,
                joinOperator: "",
                field: "userId",
                sign: "=",
                source: "tableField",
                value: "_id",
              },
              {
                id: 2,
                joinOperator: "and",
                field: "name",
                sign: "=",
                source: "string",
                value: "hello",
              },
            ],
          },
          conditions: [],
        },
      ],
      response: {
        status: 200,
        vars: ["var1"],
      },
    },
  ],
};

export const apiSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    addRequest(state, action: PayloadAction<ApiRequest>) {
      state.requests.push(action.payload);
    },
    removeRequest(state, action: PayloadAction<string>) {
      state.requests = state.requests.filter((r) => r.name !== action.payload);
    },
    editRequest(state, action: PayloadAction<ApiRequest>) {
      const index = state.requests.findIndex(
        (r) => r.name === action.payload.name
      );
      state.requests[index] = action.payload;
    },
    setCurrRequestName(state, action: PayloadAction<string | undefined>) {
      state.currRequestName = action.payload;
    },
    setCurrRequestAction(state, action: PayloadAction<ApiRequestAction | undefined>) {
      state.currRequestAction = action.payload;
    },
    setCurrRequestActionType(state, action: PayloadAction<string>) {
      const currAction = state.currRequestAction;

      if (!currAction) {
        return;
      }

      const defaultAction = {
        id: currAction.id,
        var: currAction.var,
        type: action.payload,
        table: '',
      }

      if (action.payload === 'get') {
        state.currRequestAction = {
          ...defaultAction,
          fields: [],
          conditions: []
        }
      }

      if (action.payload === 'create') {
        state.currRequestAction = {
          ...defaultAction,
          fieldsMap: {}
        }
      }

      if (action.payload === 'edit') {
        state.currRequestAction = {
          ...defaultAction,
          fieldsMap: {},
          conditions: []
        }
      }

      if (action.payload === 'remove') {
        state.currRequestAction = {
          ...defaultAction,
          conditions: []
        }
      }
    },
    saveCurrRequestAction(state) {
      const request = state.requests.find((r) => r.name === state.currRequestName);

      if (request && state.currRequestAction) {
        const index = request.actions.findIndex((a) => a.id === state.currRequestAction?.id);

        if (index !== -1) {
          request.actions[index] = state.currRequestAction;
        } else {
          request.actions.push(state.currRequestAction)
        }
      }
    },
    setApi(state, action: PayloadAction<{requests: ApiRequest[]}>) {
      state.requests = action.payload.requests;
    }
  },
});

const selectSelf = (state: RootState) => state.api;

export const currRequestSelector = createSelector(selectSelf, (state) => {
  return state.requests.find((r) => r.name === state.currRequestName)
});

export const {
  addRequest,
  removeRequest,
  editRequest,
  setCurrRequestName,
  setCurrRequestAction,
  setCurrRequestActionType,
  saveCurrRequestAction,
  setApi
} = apiSlice.actions;
export default apiSlice.reducer;

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  FrontConfig,
  ElStyle,
  BasicElement,
  GlobalState,
  ElParam,
  StateVar,
} from "@shared/model/type/front.type";
import { RootState } from "@app";
import { ElEvent } from "@shared/model/type/event.type";

export interface FrontSlice extends FrontConfig {}

const initialState: FrontSlice = {
  globalState: {},
  elements: {},
  pages: [],
};

export const frontSlice = createSlice({
  name: "front",
  initialState,
  reducers: {
    setFront(state, action: PayloadAction<FrontConfig>) {
      const config = action.payload;

      state.globalState = config.globalState ?? {};
      state.elements = config.elements ?? {};
      state.pages = config.pages ?? [];
    },
    clearFront(state) {
      state.globalState = {};
      state.elements = {};
      state.pages = [];
    },
    setElements(
      state,
      action: PayloadAction<{ [elementId: number]: BasicElement }>
    ) {
      state.elements = { ...state.elements, ...action.payload };
    },
    setElement: (state, action: PayloadAction<BasicElement>) => {
      if (state.elements) {
        state.elements[action.payload.id] = action.payload;
      }
    },
    removeElement: (state, action: PayloadAction<number>) => {
      state.elements = Object.values(state.elements ?? {}).reduce((res, element) => {
        if (element.id !== action.payload) {
          const children = element.children.filter((childId) => childId !== action.payload);
          
          res[element.id] = {
            ...element,
            children
          };
        }

        return res;
      }, {} as {[id: string]: BasicElement})
    },
    addPage: (state, action: PayloadAction<number>) => {
      state.pages.push(action.payload);
    },
    removePage: (state, action: PayloadAction<number>) => {
      state.pages = state.pages.filter((pageId) => pageId !== action.payload);
    },
    setElStyle(
      state,
      action: PayloadAction<{ elementId: number; style: ElStyle }>
    ) {
      const { elementId, style } = action.payload;

      if (state.elements) {
        const element = state.elements[elementId];

        if (element.type === "element") {
          element.style = style;
        }
      }
    },
    removeElStyle(
      state,
      action: PayloadAction<{ elementId: number; property: string }>
    ) {
      if (!state.elements) {
        return;
      }

      const { elementId, property } = action.payload;
      const element = state.elements[elementId];

      if (element.type === "element") {
        element.style = Object.keys(element.style ?? {}).reduce(
          (res: any, prop) => {
            if (prop !== property && element.style) {
              res[prop] = element.style[prop];
            }

            return res;
          },
          {}
        );
      }
    },
    setElParam(
      state,
      action: PayloadAction<{ elementId: number; elParam: ElParam }>
    ) {
      const { elementId, elParam } = action.payload;
      const element = state.elements[elementId];

      if (element.type !== "element") {
        return;
      }

      if (!element.params) {
        element.params = {};
      }

      element.params[elParam.name] = elParam;
    },
    removeElParam(
      state,
      action: PayloadAction<{ elementId: number; elParamName: string }>
    ) {
      const { elementId, elParamName } = action.payload;
      const element = state.elements[elementId];
      const newParams: { [name: string]: ElParam } = {};

      if (element.type !== "element" || !element.params) {
        return;
      }

      for (const name in element.params) {
        if (name !== elParamName) {
          newParams[name] = element.params[name];
        }
      }

      element.params = newParams;
    },
    setElEvent(
      state,
      action: PayloadAction<{ elementId: number; elEvent: ElEvent }>
    ) {
      const { elementId, elEvent } = action.payload;
      const element = state.elements[elementId];

      if (element.type !== "element") {
        return;
      }

      if (!element.events) {
        element.events = {};
      }

      element.events[elEvent.name] = elEvent;
    },
    removeElEvent(
      state,
      action: PayloadAction<{ elementId: number; elEventName: string }>
    ) {
      const { elementId, elEventName } = action.payload;
      const element = state.elements[elementId];
      const newEvents: { [name: string]: ElEvent } = {};

      if (element.type !== "element" || !element.events) {
        return;
      }

      for (const name in element.events) {
        if (name !== elEventName) {
          newEvents[name] = element.events[name];
        }
      }

      element.events = newEvents;
    },
    setElStartCode(state, action: PayloadAction<{elementId: number, code: string}>) {
      const element = state.elements[action.payload.elementId] as BasicElement;
      element.startCode = action.payload.code;
    },
    setElFinishCode(state, action: PayloadAction<{elementId: number, code: string}>) {
      const element = state.elements[action.payload.elementId] as BasicElement;
      element.finishCode = action.payload.code;
    },
    setElWrapperCode(state, action: PayloadAction<{elementId: number, code: string}>) {
      const element = state.elements[action.payload.elementId] as BasicElement;
      element.wrapperCode = action.payload.code;
    },
    setGlobalStateVar(state, action: PayloadAction<StateVar>) {
      state.globalState[action.payload.name] = action.payload;
    },
    removeGlobalStateVar(state, action: PayloadAction<string>) {
      const newState: GlobalState = {};

      for (const name in state.globalState) {
        if (name !== action.payload) {
          newState[name] = state.globalState[name];
        }
      }

      state.globalState = newState;
    },
    setElChild(
      state,
      action: PayloadAction<{ parentId: number; childId: number }>
    ) {
      const childId = action.payload.childId;
      const parent = state.elements[action.payload.parentId];

      const childIndex = parent.children.findIndex(
        (id) => id === childId
      );

      if (childIndex === -1) {
        parent.children.push(childId);
      }
    },
  },
});

const selectSelf = (state: RootState) => state.front;

export const lastElementIdSelector = createSelector(selectSelf, (state) => {
  return Object.keys(state.elements)
    .map((elementId) => Number(elementId))
    .reduce((currentId, elementId) => {
      return elementId > currentId ? elementId : currentId;
    }, 1);
});

export const lastPageIdSelector = createSelector(selectSelf, (state) => {
  return state.pages.reduce((res, pageId) => {
    return pageId > res ? pageId : res;
  }, 1);
});

export const {
  setFront,
  clearFront,
  setElements,
  setElement,
  removeElement,
  addPage,
  removePage,
  setElChild,
  setElStyle,
  removeElStyle,
  setElParam,
  removeElParam,
  setElEvent,
  removeElEvent,
  setElStartCode,
  setElFinishCode,
  setElWrapperCode,
  setGlobalStateVar,
  removeGlobalStateVar,
} = frontSlice.actions;
export default frontSlice.reducer;

import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app";
import { BasicElement, PageElement } from "@shared/model/type/front.type";
import { ElEvent } from "@shared/model/type/event.type";

export interface PageSlice {
  currPageId?: number;
  selectedElementId?: number;
  selectedEventName?: string;
  elLibModalVisible: boolean;
  activePropertyTab?: string;
}

const initialState: PageSlice = {
  elLibModalVisible: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setCurrPageId(state, action: PayloadAction<number>) {
      state.currPageId = action.payload;
    },
    clearCurrPageId(state) {
      state.currPageId = undefined;
    },
    selectElement(state, action: PayloadAction<BasicElement>) {
      state.selectedElementId = action.payload.id;
    },
    selectEvent(state, action: PayloadAction<ElEvent>) {
      state.selectedEventName = action.payload.name;
    },
    setElLibModalVisible(state, action: PayloadAction<boolean>) {
      state.elLibModalVisible = action.payload;
    },
    setActivePropertyTab(state, action: PayloadAction<string | undefined>) {
      state.activePropertyTab = action.payload;
    },
  },
});

const selectRoot = (state: RootState) => state;
const selectSelf = (state: RootState) => state.page;

export const currPageSelector = createSelector(
  selectSelf,
  selectRoot,
  (state, rootState) => {
    return rootState.front.elements && state.currPageId
      ? (rootState.front.elements[state.currPageId] as PageElement)
      : undefined;
  }
);

export const selectedElementSelector = createSelector(
  selectSelf,
  selectRoot,
  (state, rootState): BasicElement | undefined => {
    return rootState.front.elements && state.selectedElementId
      ? rootState.front.elements[state.selectedElementId]
      : undefined;
  }
);

export const selectedEventSelector = createSelector(
  selectSelf,
  selectedElementSelector,
  (state, elState): ElEvent | undefined => {
    return elState?.events && state.selectedEventName
      ? elState?.events[state.selectedEventName]
      : undefined;
  }
);

export const {
  setCurrPageId,
  clearCurrPageId,
  setElLibModalVisible,
  setActivePropertyTab,
  selectElement,
  selectEvent
} = pageSlice.actions;
export default pageSlice.reducer;

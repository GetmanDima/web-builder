import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "@shared/model/type/project.type";

export interface ProjectSlice {
  projects: Project[],
  currProjectId?: string,
}

const initialState: ProjectSlice = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrProjectId(state, action: PayloadAction<string>) {
      state.currProjectId = action.payload;
    },
    clearCurrProjectId(state) {
      state.currProjectId = undefined;
    },
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
  },
});

export const {
  setCurrProjectId,
  clearCurrProjectId,
  setProjects,
  addProject
} = projectSlice.actions;
export default projectSlice.reducer;

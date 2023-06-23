import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Table {
  name: string;
  fields: string[];
}

export interface DbSlice {
  tables: Table[];
}

const initialState: DbSlice = {
  tables: [
    {
      name: "users",
      fields: ["email", "password"],
    },
    {
      name: "projects",
      fields: ["name", "userId"],
    },
  ],
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    addTable(state, action: PayloadAction<Table>) {
      state.tables.push(action.payload);
    },
    removeTable(state, action: PayloadAction<string>) {
      state.tables = state.tables.filter(
        (table) => table.name !== action.payload
      );
    },
    editTable(state, action: PayloadAction<Table>) {
      const index = state.tables.findIndex(
        (table) => table.name === action.payload.name
      );
      state.tables[index] = action.payload;
    },
    setDb(state, action: PayloadAction<DbSlice>) {
      state.tables = action.payload.tables;
    },
  },
});

export const { addTable, removeTable, editTable, setDb } = dbSlice.actions;
export default dbSlice.reducer;

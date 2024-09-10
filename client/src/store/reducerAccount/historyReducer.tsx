import { createSlice } from "@reduxjs/toolkit";
import { Historys } from "@/interface/user";
import { addHistory, getHistory } from "@/services/history.service";

const historyState: Historys[] = [];

const historyReducer = createSlice({
  name: "history",
  initialState: {
    history: historyState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(addHistory.fulfilled, (state, action) => {
        state.history.push(action.payload);
      });
  },
});

export default historyReducer.reducer;

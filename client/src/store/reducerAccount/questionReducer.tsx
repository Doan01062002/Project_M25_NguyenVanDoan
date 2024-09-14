import { createSlice } from "@reduxjs/toolkit";
import { Question } from "@/interface/admin";
import {
  addQues,
  deleteQues,
  getAllQues,
  paginateQues,
  updateQues,
} from "@/services/question.service";

const quesState: Question[] = [];

const quesReducer = createSlice({
  name: "ques",
  initialState: {
    total: 0, // Total number of questions
    ques: quesState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQues.fulfilled, (state, action) => {
        state.ques = action.payload;
      })
      .addCase(addQues.fulfilled, (state, action) => {
        state.ques.push(action.payload);
      })
      .addCase(deleteQues.fulfilled, (state, action) => {
        state.ques = state.ques.filter((ques) => ques.id !== action.payload);
      })
      .addCase(updateQues.fulfilled, (state, action) => {
        state.ques = state.ques.map((ques) =>
          ques.id === action.payload.id ? action.payload : ques
        );
      })
      .addCase(paginateQues.fulfilled, (state, action) => {
        state.ques = action.payload.data;
        state.total = action.payload.total;
      });
  },
});

export default quesReducer.reducer;

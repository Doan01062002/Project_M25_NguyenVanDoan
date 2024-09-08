import { createSlice } from "@reduxjs/toolkit";
import { Course } from "@/interface/admin";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  searchCourse,
  sortCourse,
  updateCourse,
} from "@/services/course.service";

const courseState: Course[] = [];

const courseReducer: any = createSlice({
  name: "course",
  initialState: {
    course: courseState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourse.fulfilled, (state: any, action) => {
        state.course = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.course.push(action.payload);
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.course = state.course.filter(
          (course: Course) => course.id !== action.payload
        );
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.course = state.course.map((course: Course) =>
          course.id === action.payload.id ? action.payload : course
        );
      })
      .addCase(searchCourse.fulfilled, (state, action) => {
        state.course = action.payload;
      })
      .addCase(sortCourse.fulfilled, (state, action) => {
        state.course = action.payload;
      });
  },
});
export default courseReducer.reducer;

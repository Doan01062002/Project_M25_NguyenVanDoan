import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, fetchFeedbacks } from "@/services/feedback.service";

const feedbackState: { review: string; rating: number }[] = [];

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    reviews: feedbackState,
    status: "idle", // Add status to track loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      state.reviews.push(action.payload); // Add new feedback to state
    });
    builder.addCase(fetchFeedbacks.fulfilled, (state, action) => {
      state.reviews = action.payload; // Store fetched feedbacks in state
    });
  },
});

export default feedbackSlice.reducer;

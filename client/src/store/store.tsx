import { configureStore } from "@reduxjs/toolkit";
import accountAdminReducer from "./reducerAccount/accountAdminReducer";
import userReducer from "./reducerAccount/userReducer";
import courseReducer from "./reducerAccount/courseReducer";
import subjectReducer from "./reducerAccount/subjectReducer";
import examReducer from "./reducerAccount/examReducer";
import questionReducer from "./reducerAccount/questionReducer";
import historyReducer from "./reducerAccount/historyReducer";
import feedbackSlice from "./reducerAccount/feedbackSlice";

const store: any = configureStore({
  reducer: {
    admin: accountAdminReducer,
    users: userReducer,
    courses: courseReducer,
    subjects: subjectReducer,
    exams: examReducer,
    questions: questionReducer,
    historys: historyReducer,
    feedback: feedbackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

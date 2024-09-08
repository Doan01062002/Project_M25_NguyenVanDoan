import { configureStore } from "@reduxjs/toolkit";
import accountAdminReducer from "./reducerAccount/accountAdminReducer";
import userReducer from "./reducerAccount/userReducer";
import courseReducer from "./reducerAccount/courseReducer";

const store: any = configureStore({
  reducer: {
    admin: accountAdminReducer,
    users: userReducer,
    courses: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

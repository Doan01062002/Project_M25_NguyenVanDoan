import { configureStore } from "@reduxjs/toolkit";
import accountAdminReducer from "./reducerAccount/accountAdminReducer";

const store: any = configureStore({
  reducer: {
    admin: accountAdminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

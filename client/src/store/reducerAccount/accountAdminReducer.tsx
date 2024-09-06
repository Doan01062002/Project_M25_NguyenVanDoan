import { createSlice } from "@reduxjs/toolkit";
import { AccountAdmin } from "../../interface/index";
import { getAdmin } from "../../services/accountAdmin.service";

const state: AccountAdmin[] = [];

const reducerAdmin = createSlice({
  name: "reducerAdmin",
  initialState: { admins: state },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAdmin.pending, (state, action) => {})
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admins = action.payload;
      })
      .addCase(getAdmin.rejected, () => {});
  },
});

export default reducerAdmin.reducer;

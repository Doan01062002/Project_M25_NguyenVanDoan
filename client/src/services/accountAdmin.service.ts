import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get account Admin
export const getAdmin: any = createAsyncThunk("admin/getAdmin", async () => {
  const response = await axios.get("http://localhost:8080/admin");
  return response.data;
});

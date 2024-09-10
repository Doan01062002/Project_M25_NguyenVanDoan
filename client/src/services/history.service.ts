import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
// API lấy dữ liệu lịch sử làm bài
export const getHistory: any = createAsyncThunk(
  "history/getHistory",
  async (id: number) => {
    const response = await axios.get(`${URL}/history/${id}`);
    return response.data;
  }
);

// API thêm lịch sử làm bài
export const addHistory: any = createAsyncThunk(
  "history/addHistory",
  async (data: any) => {
    const response = await axios.post(`${URL}/history`, data);
    return response.data;
  }
);

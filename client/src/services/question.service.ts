import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllQues: any = createAsyncThunk(
  "question/getAllQues",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/question?idExam_like=${id}`);
    return response.data;
  }
);

// API thêm câu hỏi
export const addQues: any = createAsyncThunk(
  "question/addQues",
  async (data: any) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.post(`${URL}/question`, data);
    return response.data;
  }
);

// API xóa câu hỏi
export const deleteQues: any = createAsyncThunk(
  "question/deleteQues",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.delete(`${URL}/question/${id}`);
    return response.data;
  }
);

// API cập nhật câu hỏi
export const updateQues: any = createAsyncThunk(
  "question/updateQues",
  async (data: any) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.put(`${URL}/question/${data.id}`, data);
    return response.data;
  }
);

// Thêm logic trả về tổng số question để tính tổng số trang
export const paginateQues: any = createAsyncThunk(
  "question/paginateQues",
  async ({ page, limit }: { page: number; limit: number }) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${URL}/question?_page=${page}&_limit=${limit}`
    );
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllExam: any = createAsyncThunk(
  "exam/getAllExam",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/exam?idLesson_like=${id}`);
    return response.data;
  }
);

// API thêm đề thi theo id của môn thi
export const addExam: any = createAsyncThunk(
  "exam/addExam",
  async (data: any) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.post(`${URL}/exam`, data);
    return response.data;
  }
);

// API xóa đề thi theo id của môn thi
export const deleteExam: any = createAsyncThunk(
  "exam/deleteExam",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.delete(`${URL}/exam/${id}`);
    return response.data;
  }
);

// API cập nhật đề thi theo id của môn thi
export const updateExam: any = createAsyncThunk(
  "exam/updateExam",
  async (data: any) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.put(`${URL}/exam/${data.id}`, data);
    return response.data;
  }
);

// API hiển thị thông tin đề thi theo id của đề
export const getExamById: any = createAsyncThunk(
  "exam/getExamById",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/exam/${id}`);
    return response.data;
  }
);

// API tìm kiếm đề thi trong môn học
export const searchExam: any = createAsyncThunk(
  "exam/searchExam",
  async ({ idLesson, search }: { idLesson: number; search: string }) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${URL}/exam?nameLesson_like=${search}&idLesson=${idLesson}`
    );
    return response.data;
  }
);

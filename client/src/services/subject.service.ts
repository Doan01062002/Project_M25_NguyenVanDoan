import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API lấy môn học theo id từ id kháo học
export const getAllSubject: any = createAsyncThunk(
  "subject/getAllSubject",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/lesson?idCourse_like=${id}`);
    return response.data;
  }
);

// API thêm môn học theo id của khóa học
export const addSubject: any = createAsyncThunk(
  "subject/addSubject",
  async (data: any) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.post(`${URL}/lesson`, data);
    return response.data;
  }
);

// API xóa môn học theo id của khóa học
export const deleteSubject: any = createAsyncThunk(
  "subject/deleteSubject",
  async (id: number) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.delete(`${URL}/lesson/${id}`);
    return response.data;
  }
);

// API cập nhật môn thi
export const updateSubject: any = createAsyncThunk(
  "subject/updateSubject",
  async (data: any) => {
    console.log(1111, data);

    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.put(`${URL}/lesson/${data.id}`, data);
    return response.data;
  }
);

// API tìm kiếm môm học
export const searchSubject: any = createAsyncThunk(
  "subject/searchSubject",
  async (searchItem: string) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${URL}/lesson?nameSubject_like=${searchItem}`
    );
    return response.data;
  }
);

// API sắp xếp môn thi từ A-Z và từ Z-A
export const sortSubject: any = createAsyncThunk(
  "subject/sortSubject",
  async (sort: string) => {
    const URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${URL}/lesson?_sort=nameSubject&_order=${sort}`
    );
    return response.data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API lấy dữ liệu khóa học
export const getAllCourse: any = createAsyncThunk(
  "course/getAllCourse",
  async () => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    // console.log(1111,url);

    const response = await axios.get(`${url}/course`);
    return response.data;
  }
);

// API thêm khóa học
export const addCourse: any = createAsyncThunk(
  "course/addCourse",
  async (data: any) => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.post(`${url}/course`, data);
    return response.data;
  }
);

// API xóa khóa học
export const deleteCourse: any = createAsyncThunk(
  "course/deleteCourse",
  async (id: number) => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.delete(`${url}/course/${id}`);
    return response.data;
  }
);

// API sửa khóa học
export const updateCourse: any = createAsyncThunk(
  "course/updateCourse",
  async (data: any) => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.put(`${url}/course/${data.id}`, data);
    return response.data;
  }
);

// API tìm kiếm khóa học
export const searchCourse: any = createAsyncThunk(
  "course/searchCourse",
  async (searchItem: string) => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${url}/course?nameCourse_like=${searchItem}`
    );
    return response.data;
  }
);

// API sắp xếp khóa học từ A-Z và từ Z-A
export const sortCourse: any = createAsyncThunk(
  "course/sortCourse",
  async (sort: string) => {
    let url = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${url}/course?_sort=nameCourse&_order=${sort}`
    );
    return response.data;
  }
);

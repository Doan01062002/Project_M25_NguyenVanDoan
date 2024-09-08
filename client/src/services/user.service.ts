import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser: any = createAsyncThunk("user/getAllUser", async () => {
  let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
  const response = await axios.get(`${URL}/user`);
  return response.data;
});

// API thêm user khi đăng ký
export const addUser: any = createAsyncThunk(
  "user/addUser",
  async (data: any) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.post(`${URL}/user`, data);
    return response.data;
  }
);

// API cập nhật trạng thái user
export const updateUserStatus: any = createAsyncThunk(
  "user/updateUserStatus",
  async (data: any) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.patch(`${URL}/user/${data.id}`, data);
    return response.data;
  }
);

// API tìm kiếm user
export const searchUser: any = createAsyncThunk(
  "user/searchUser",
  async (searchUser: string) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/user?name_like=${searchUser}`);
    return response.data;
  }
);

// API cập nhật thông tin user
export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (data: any) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.patch(`${URL}/user/${data.id}`, data);
    return response.data;
  }
);

// API sắp xếp user từ A-Z và Z-A
export const sortUser: any = createAsyncThunk(
  "user/sortUser",
  async (order: string) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(`${URL}/user?_sort=name&_order=${order}`);
    return response.data;
  }
);

// Thêm logic trả về tổng số user để tính tổng số trang
export const paginateUser: any = createAsyncThunk(
  "user/paginateUser",
  async ({ page, limit }: { page: number; limit: number }) => {
    let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
    const response = await axios.get(
      `${URL}/user?_page=${page}&_limit=${limit}`
    );
    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

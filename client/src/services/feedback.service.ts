import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL; // URL gốc

// API để gửi phản hồi
export const addFeedback: any = createAsyncThunk(
  "feedback/addFeedback",
  async (data: any) => {
    const response = await axios.post(`${URL}/feedback`, data); // Gửi phản hồi đến API
    return response.data;
  }
);

// API to fetch feedbacks
export const fetchFeedbacks: any = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async () => {
    const response = await axios.get(`${URL}/feedback`); // Fetch feedback data from the API
    return response.data;
  }
);

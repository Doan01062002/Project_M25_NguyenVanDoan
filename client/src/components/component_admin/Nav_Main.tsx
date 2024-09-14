"use client";
import { getAllExams } from "@/services/exam.service";
import { fetchFeedbacks } from "@/services/feedback.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Feedback {
  idUser: number;
  idExam: number;
  idCourse: number;
  idSubject: number;
  review: string;
  rating: number;
  date: string;
  id: number;
}

interface ExamStats {
  idExam: number;
  ratingCount: number;
  averageRating: number;
}

export default function AdminHome() {
  const feedbacks = useSelector((state: any) => state.feedback.reviews);
  const examState = useSelector((state: any) => state.exams.exam);
  const dispatch = useDispatch();

  // Fetch feedbacks on component mount
  useEffect(() => {
    dispatch(fetchFeedbacks());
    dispatch(getAllExams());
  }, [dispatch]);

  console.log(examState);

  const [mostRated, setMostRated] = useState<ExamStats[]>([]);
  const [bestRated, setBestRated] = useState<ExamStats[]>([]);
  const [worstRated, setWorstRated] = useState<ExamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (feedbacks.length > 0) {
      // Group feedbacks by idExam and calculate the number of ratings and average rating
      const examRatings = feedbacks.reduce((acc: any, feedback: Feedback) => {
        if (!acc[feedback.idExam]) {
          acc[feedback.idExam] = {
            idExam: feedback.idExam,
            ratingCount: 0,
            totalRating: 0,
          };
        }
        acc[feedback.idExam].ratingCount += 1;
        acc[feedback.idExam].totalRating += feedback.rating;
        return acc;
      }, {});

      // Calculate average rating for each exam
      const examStats: ExamStats[] = Object.values(examRatings).map(
        (exam: any) => ({
          idExam: exam.idExam,
          ratingCount: exam.ratingCount,
          averageRating: exam.totalRating / exam.ratingCount,
        })
      );

      // Sort for most, best, and worst rated exams
      setMostRated(
        [...examStats].sort((a, b) => b.ratingCount - a.ratingCount)
      );
      setBestRated(
        [...examStats].sort((a, b) => b.averageRating - a.averageRating)
      );
      setWorstRated(
        [...examStats].sort((a, b) => a.averageRating - b.averageRating)
      );
      setLoading(false);
    }
  }, [feedbacks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Thi Online</h1>
          <h2 className="text-xl text-gray-500">Trang chủ</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="w-64 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tìm kiếm ở đây"
            />
            <i className="fas fa-search absolute top-2 right-3 text-gray-400"></i>
          </div>
          <img
            className="w-10 h-10 rounded-full"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            alt="User"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Thi nhiều nhất */}
        <div className="bg-red-200 p-6 rounded-lg shadow-md">
          <h3>Đề thi được thi nhiều nhất</h3>
          {mostRated.length > 0
            ? examState.find((exam: any) => exam.id === mostRated[0]?.idExam)
                ?.nameLesson || "Không có tên"
            : "Không có dữ liệu"}
        </div>

        {/* Đánh giá tốt nhất */}
        <div className="bg-green-200 p-6 rounded-lg shadow-md">
          <h3>Đề thi đánh giá tốt nhất</h3>
          {bestRated.length > 0
            ? examState.find((exam: any) => exam.id === bestRated[0]?.idExam)
                ?.nameLesson || "Không có tên"
            : "Không có dữ liệu"}
        </div>

        {/* Đánh giá kém nhất */}
        <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
          <h3>Đề thi đánh giá kém nhất</h3>
          {worstRated.length > 0
            ? examState.find((exam: any) => exam.id === worstRated[0]?.idExam)
                ?.nameLesson || "Không có tên"
            : "Không có dữ liệu"}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Bảng thống kê</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">STT</th>
              <th className="px-4 py-2">Tên tài khoản</th>
              <th className="px-4 py-2">Mật khẩu</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Trạng thái hoạt động</th>
              <th className="px-4 py-2">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">hoang2005</td>
                  <td className="px-4 py-2">hoang123</td>
                  <td className="px-4 py-2">24/05/2023</td>
                  <td className="px-4 py-2 text-green-500">Đang hoạt động</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                      Chặn
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

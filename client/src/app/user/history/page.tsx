"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/component_user/Header";
import Footer from "@/components/component_user/Footer";
import { FieldTimeOutlined, UserOutlined } from "@ant-design/icons";

export default function History() {
  const id = JSON.parse(localStorage.getItem("checkUser") || "{}");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: historyData } = await axios.get(
          `http://localhost:8080/history?idUser=${id.id}`
        );

        const historyWithDetails: any = await Promise.all(
          historyData.map(async (data: any) => {
            const [examResponse, subjectResponse, courseResponse] =
              await Promise.all([
                axios.get(`http://localhost:8080/exam/${data.idExam}`),
                axios.get(`http://localhost:8080/lesson/${data.idSubject}`),
                axios.get(`http://localhost:8080/course/${data.idCourse}`),
              ]);

            return {
              ...data,
              nameCourse: courseResponse.data.nameCourse,
              nameSubject: subjectResponse.data.nameSubject,
              nameExam: examResponse.data.nameLesson,
            };
          })
        );

        setHistory(historyWithDetails);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="flex justify-center py-12">
        <div className="w-1/4 bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <UserOutlined className="text-xl mr-2" />
            <a href="/user/profile" className="text-black hover:underline">
              Thông tin cá nhân
            </a>
          </div>
          <div className="flex items-center">
            <FieldTimeOutlined className="text-xl mr-2" />
            <p className="text-black">Lịch sử làm bài</p>
          </div>
        </div>

        <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg ml-8">
          <h1 className="text-2xl font-semibold mb-6">Lịch sử làm bài</h1>
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">STT</th>
                <th className="py-2 px-4">Khóa thi</th>
                <th className="py-2 px-4">Môn thi</th>
                <th className="py-2 px-4">Đề thi</th>
                <th className="py-2 px-4">Điểm</th>
                <th className="py-2 px-4">Thời gian</th>
                <th className="py-2 px-4">Ngày làm</th>
              </tr>
            </thead>
            <tbody id="historyList">
              {history.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.nameCourse}</td>
                  <td className="py-2 px-4">{item.nameSubject}</td>
                  <td className="py-2 px-4">{item.nameExam}</td>
                  <td className="py-2 px-4">{item.score}</td>
                  <td className="py-2 px-4">{item.timeCompleted}</td>
                  <td className="py-2 px-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </div>
  );
}

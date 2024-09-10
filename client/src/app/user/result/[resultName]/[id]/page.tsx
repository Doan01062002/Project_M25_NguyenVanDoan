"use client";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@/components/component_user/Footer";
import Header from "@/components/component_user/Header";
import { useEffect, useState } from "react";
import { getAllQues } from "@/services/question.service";
import { Question } from "@/interface/admin";
import { useParams, useRouter } from "next/navigation";

export default function Result() {
  const answer = JSON.parse(localStorage.getItem("answers") || "[]");
  const completedTime = JSON.parse(localStorage.getItem("elapsedTime") || "[]");
  const { exam, id }: { exam: string; id: any } = useParams();
  const quesState = useSelector((state: any) => state.questions.ques);
  const router = useRouter();
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (id) {
      dispatch(getAllQues(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (quesState.length > 0) {
      const correctAns = quesState.map((ques: Question) => ques.answer);
      setCorrectAnswers(correctAns);

      // Tính toán điểm
      let correctCount = 0;
      correctAns.forEach((ans: any, index: number) => {
        if (ans === answer[index]) {
          correctCount++;
        }
      });
      setScore(correctCount);

      // Lưu điểm vào localStorage sau khi tính toán
      const finalScore = (correctCount * 10) / quesState.length;
      localStorage.setItem("score", JSON.stringify(finalScore));
    }
  }, [quesState, answer]);

  // localStorage.setItem(
  //   "score",
  //   JSON.stringify((score * 10) / quesState.length)
  // );

  const handlePrevExam = () => {
    router.push("/");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Result Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-4">
              Kết quả của bạn
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="flex-1">
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-semibold">Điểm số</h3>
                  <p className="text-4xl font-bold">
                    {score}/{quesState.length}
                  </p>
                </div>
                <div className="text-gray-700">
                  <p className="text-lg">
                    Thời gian hoàn thành: {formatTime(completedTime)}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{exam}</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-calendar-check text-blue-500"></i>
                    <span>2930 lượt thi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-question-circle text-blue-500"></i>
                    <span>{quesState.length} câu hỏi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-clock text-blue-500"></i>
                    <span>20 phút</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="p-6 flex justify-between border-t border-gray-200">
            <button
              onClick={handlePrevExam}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
            >
              Trở về trang chủ <i className="fas fa-undo-alt ml-2"></i>
            </button>
            <a href="./Subjects.html">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                Bài tiếp theo <i className="fas fa-forward ml-2"></i>
              </button>
            </a>
          </div>
        </div>
        {/* Answer Review */}
        <div className="max-w-4xl mx-auto mt-8">
          {quesState.map((ques: any, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-6">
              <h2 className="text-2xl font-semibold mb-2">Câu {index + 1}</h2>
              <p className="text-lg font-bold mb-4">{ques.nameQues}</p>
              <div className="space-y-2">
                {ques.options.map((option: string, optIndex: number) => (
                  <div
                    key={optIndex}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      option === correctAnswers[index]
                        ? "bg-green-100 text-green-800"
                        : option === answer[index]
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`answer-${index}`}
                      disabled
                      checked={answer[index] === option}
                      className="form-radio text-blue-500"
                    />
                    <p>{option}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Giải thích:</p>
                <p>Chọn {ques.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

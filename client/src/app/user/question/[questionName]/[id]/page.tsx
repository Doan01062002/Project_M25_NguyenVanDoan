"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllQues } from "@/services/question.service";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { addHistory } from "@/services/history.service";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";

export default function QuestionPage() {
  const { exam, id }: { exam: string; id: any } = useParams();
  const account = JSON.parse(localStorage.getItem("account") || "[]");
  const completedTime = JSON.parse(localStorage.getItem("elapsedTime") || "[]");
  const idCourse = JSON.parse(localStorage.getItem("idCourse") || "[]");
  const idSubject = JSON.parse(localStorage.getItem("idSubject") || "[]");
  const score = JSON.parse(localStorage.getItem("score") || "[]");

  const dispatch = useDispatch();
  const quesState = useSelector((state: any) => state.questions.ques);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [answers, setAnswers] = useState<Array<string | null>>(
    Array(quesState.length).fill(null)
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getAllQues(parseInt(id)));
      const startTime = new Date().getTime();
      localStorage.setItem("startTime", JSON.stringify(startTime));
    }
  }, [dispatch, id]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUp = () => {
    Swal.fire({
      title: "Hết giờ làm bài!",
      text: "Bạn sẽ được chuyển sang trang kết quả.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      router.push(`/user/result/${exam}/${id}`);
    });
  };

  const handlePreQues = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextQues = () => {
    if (questionIndex < quesState.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async () => {
    const startTime = JSON.parse(localStorage.getItem("startTime") || "0");
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    localStorage.setItem("elapsedTime", JSON.stringify(elapsedTime));

    // Tính toán điểm dựa trên câu trả lời đã lưu
    const storedAnswers = JSON.parse(localStorage.getItem("answers") || "[]");
    let calculatedScore = 0;

    quesState.forEach((question: any, index: number) => {
      if (storedAnswers[index] === question.answer) {
        calculatedScore++;
      }
    });

    // Cập nhật điểm vào localStorage
    const finalScore = (calculatedScore * 10) / quesState.length;
    localStorage.setItem("score", JSON.stringify(finalScore));

    Swal.fire({
      title: "Nộp bài thành công!",
      text: "Bạn sẽ được chuyển sang trang kết quả.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      router.push(`/user/result/${exam}/${id}`);
    });

    const newResult = {
      idUser: account.id,
      idExam: Number(id),
      idCourse: idCourse,
      idSubject: idSubject,
      score: finalScore, // Lưu score vào đây
      timeCompleted: formatTime(completedTime),
      date: format(new Date(), "dd/MM/yyyy"),
    };

    await dispatch(addHistory(newResult));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-lg py-4 px-6">
        <div className="flex items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YjOcWqqSFwp2tsPsnvu4Hx4n5hdvanfzbg&s"
            alt="OnlineTest Logo"
            className="w-10 h-10 transition-transform transform hover:scale-105"
          />
          <p className="text-xl font-bold text-gray-800 ml-2">OnlineTest</p>
        </div>
        <button
          className="text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-lg px-4 py-2 rounded shadow-md transition ease-in-out duration-300"
          onClick={handleShowModal}
        >
          Exit
        </button>
      </div>

      {/* Main Content */}
      <section className="flex flex-col lg:flex-row py-8 px-4 space-x-6">
        {/* Left Menu */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <img
              src={account.image}
              alt="User Avatar"
              className="w-20 h-20 rounded-full shadow-lg mb-2"
            />
            <p className="text-xl font-bold text-gray-700">{account.name}</p>
          </div>
          <div className="text-center">
            <span className="text-5xl text-gray-700 material-symbols-outlined">
              timer
            </span>
            <div
              id="countdown"
              className="text-3xl font-bold mt-4 text-red-500 animate-pulse"
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Mid Content */}
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          {quesState.length > 0 && (
            <>
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">
                  Câu {questionIndex + 1}
                </h1>
                <p className="text-lg text-gray-800">
                  {quesState[questionIndex].nameQues}
                </p>
              </div>
              <form className="space-y-6">
                {quesState[questionIndex].options.map(
                  (option: string, optIndex: number) => (
                    <div
                      key={optIndex}
                      className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded transition"
                    >
                      <input
                        type="radio"
                        name={`answer-${questionIndex}`}
                        id={`answer-${questionIndex}-${optIndex}`}
                        checked={answers[questionIndex] === option}
                        onChange={() => handleAnswerChange(option)}
                        className="mr-2 text-blue-600"
                      />
                      <label
                        htmlFor={`answer-${questionIndex}-${optIndex}`}
                        className="text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  )
                )}
              </form>
              <div className="flex justify-between mt-8">
                <button
                  className="px-5 py-3 bg-gray-300 hover:bg-gray-400 text-lg rounded shadow transition ease-in-out duration-300"
                  onClick={handlePreQues}
                >
                  Câu trước
                </button>
                <button
                  className="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-lg text-white rounded shadow transition ease-in-out duration-300"
                  onClick={handleNextQues}
                >
                  Câu sau
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Menu */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-xl">
          <div className="grid grid-cols-5 gap-2 mb-8">
            {quesState.map((item: any, index: number) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full text-white text-lg font-bold ${
                  answers[index] ? "bg-green-500" : "bg-gray-300"
                } transition-all hover:shadow-lg`}
                onClick={() => setQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="w-full py-3 bg-red-500 text-lg text-white rounded hover:bg-red-600 shadow-md transition ease-in-out duration-300"
            onClick={handleShowModal}
          >
            Nộp bài
          </button>
        </div>
      </section>

      {/* Submit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-lg">Xác nhận nộp bài</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-gray-700">
          Bạn có chắc chắn muốn nộp bài không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Nộp bài
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

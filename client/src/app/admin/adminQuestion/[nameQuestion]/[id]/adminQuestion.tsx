"use client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQues,
  deleteQues,
  getAllQues,
  paginateQues,
  updateQues, // Import the update action
} from "@/services/question.service";
import { AddQues, Question } from "@/interface/admin";
import { format } from "date-fns";
import { useParams } from "next/navigation";

export default function AdminQues() {
  const [quesDelete, setQuesDelete] = useState<Question | null>(null);
  const quesState = useSelector((state: any) => state.questions.ques);
  const totalQuestions = useSelector((state: any) => state.questions.total);

  const { chapter, id }: { chapter: string; id: any } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit per page

  useEffect(() => {
    if (id) {
      dispatch(paginateQues({ page: currentPage, limit }));
    }
  }, [dispatch, id, currentPage, limit]);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => {
    setShowEdit(false);
    resetData();
  };
  const handleShowEdit = (ques: Question) => {
    setQuesEdit(ques);
    setQuestion({
      nameQues: ques.nameQues,
      options: ques.options,
      answer: ques.answer,
    });
    setShowEdit(true);
  };

  const [question, setQuestion] = useState<AddQues>({
    nameQues: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const [error, setError] = useState({ nameQues: "" });

  const resetData = () => {
    setQuestion({
      nameQues: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  const handleAdd = async () => {
    let valid = true;
    if (!question.nameQues) {
      error.nameQues = "Tên câu hỏi không được để trống";
      valid = false;
    } else {
      error.nameQues = "";
    }

    setError({ ...error });

    if (valid) {
      const newQues = {
        ...question,
        idExam: id,
        created_at: format(new Date(), "yyyy/MM/dd"),
      };
      await dispatch(addQues(newQues));
      setShow(false);
      resetData();
      dispatch(paginateQues({ page: currentPage, limit }));
    }
  };

  const handleOptionClick = (value: string) => {
    setQuestion({ ...question, answer: value });
  };

  const handleInputChange = (index: number, value: string) => {
    const newOption = [...question.options];
    newOption[index] = value;
    setQuestion({ ...question, options: newOption });
  };

  const handleDelete = async (idCheck: number) => {
    await dispatch(deleteQues(idCheck));
    setQuesDelete(null);
    dispatch(paginateQues({ page: currentPage, limit }));
  };

  const [quesEdit, setQuesEdit] = useState<Question | null>(null);
  const handleEdit = async () => {
    let valid = true;
    if (!question.nameQues) {
      error.nameQues = "Tên câu hỏi không được để trống";
      valid = false;
    } else {
      error.nameQues = "";
    }

    setError({ ...error });

    if (valid && quesEdit) {
      const updatedQues = {
        ...quesEdit,
        nameQues: question.nameQues,
        options: question.options,
        answer: question.answer,
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      };
      await dispatch(updateQues(updatedQues));
      setShowEdit(false);
      resetData();
      dispatch(paginateQues({ page: currentPage, limit }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Quản lí câu hỏi</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm câu hỏi
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên câu hỏi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên câu hỏi"
                        name="nameQues"
                        value={question.nameQues}
                        onChange={(e) =>
                          setQuestion({ ...question, nameQues: e.target.value })
                        }
                      />
                      {error.nameQues && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameQues}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Label>Đáp án</Form.Label>
                    <div className="options-list">
                      {question.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            question.answer === option ? "success" : "secondary"
                          }
                          onClick={() => handleOptionClick(option)}
                          className="me-2"
                        >
                          {option || `Nhập đáp án ${index + 1}`}
                        </Button>
                      ))}
                    </div>
                    <Form.Text className="text-muted">
                      {question.answer
                        ? `Đáp án đúng: ${question.answer}`
                        : "Chưa chọn đáp án đúng"}
                    </Form.Text>
                    {question.options.map((option, index) => (
                      <Form.Group
                        className="mb-3 flex gap-2"
                        key={index}
                        controlId={`formOption${index + 1}`}
                      >
                        <Form.Control
                          type="text"
                          placeholder={`Nhập đáp án ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    Thêm câu hỏi
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Form sửa câu hỏi */}
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Câu hỏi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên câu hỏi"
                        name="nameQues"
                        value={question.nameQues}
                        onChange={(e) =>
                          setQuestion({ ...question, nameQues: e.target.value })
                        }
                      />
                      {error.nameQues && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameQues}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Label>Đáp án</Form.Label>
                    <div className="options-list">
                      {question.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            question.answer === option ? "success" : "secondary"
                          }
                          onClick={() => handleOptionClick(option)}
                          className="me-2"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <Form.Text className="text-muted">
                      {question.answer
                        ? `Đáp án đúng: ${question.answer}`
                        : "Chưa chọn đáp án đúng"}
                    </Form.Text>
                    {question.options.map((option, index) => (
                      <Form.Group
                        className="mb-3 flex gap-2"
                        key={index}
                        controlId={`formOption${index + 1}`}
                      >
                        <Form.Control
                          type="text"
                          placeholder={`Nhập đáp án ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                      </Form.Group>
                    ))}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Lưu thay đổi
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="user-info">
            <div className="sort">
              <Form.Select aria-label="Default select example">
                <option>Sắp xếp theo</option>
                <option value="1">Từ A-Z</option>
                <option value="2">Từ Z-A</option>
              </Form.Select>
            </div>
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Tìm kiếm ở đây" />
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng câu hỏi của {chapter}</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="w-16">STT</th>
                  <th>Tên câu hỏi</th>
                  <th className="w-52">Ngày thêm</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {quesState.map((question: Question, index: number) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>
                    <td>{question.nameQues}</td>
                    <td>{question.created_at}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(question)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setQuesDelete(question)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {quesDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setQuesDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>
                      Bạn chắc chắn muốn xóa câu hỏi {quesDelete?.nameQues}?
                    </p>
                  </div>
                  <div className="modal-footer-footer">
                    <Button variant="light" onClick={() => setQuesDelete(null)}>
                      Hủy
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(quesDelete.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <br />
            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Pre
              </button>
              {[...Array(Math.ceil(totalQuestions / limit))].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 border rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(totalQuestions / limit)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === Math.ceil(totalQuestions / limit)
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

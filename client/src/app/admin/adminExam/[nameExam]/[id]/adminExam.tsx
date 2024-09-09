"use client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExam,
  deleteExam,
  getAllExam,
  updateExam,
} from "@/services/exam.service";
import { AddExam, Exam } from "@/interface/admin";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useParams, useRouter } from "next/navigation";

export default function AdminExam() {
  const [examDelete, setExamDelete] = useState<Exam | null>(null);
  const [examEdit, setExamEdit] = useState<Exam | null>(null);
  const [inputValue, setInputValue] = useState<AddExam>({
    nameLesson: "",
    describe: "",
    image: "",
  });
  const [error, setError] = useState({
    nameLesson: "",
    describe: "",
  });
  const [image, setImage] = useState<string>("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { exam, id }: { exam: string; id: any } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(1111, exam, id);

  // Ensure idLesson is a number
  const idLessonNumber = Array.isArray(id)
    ? parseInt(id[0])
    : parseInt(id || "0");

  const examState = useSelector((state: any) => state.exams.exam);

  const handleClick = (id: number, exam: Exam) => {
    router.push(`/admin/adminQuestion/${exam.nameLesson}/${id}`);
  };

  useEffect(() => {
    if (idLessonNumber) {
      dispatch(getAllExam(idLessonNumber));
    }
  }, [dispatch, idLessonNumber]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = (exam: Exam) => {
    setExamEdit(exam);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.nameLesson) {
      setError((prev) => ({
        ...prev,
        nameLesson: "Tên đề thi không được để trống",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, nameLesson: "" }));
    }

    if (!inputValue.describe) {
      setError((prev) => ({ ...prev, describe: "Vui lòng nhập mô tả" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, describe: "" }));
    }

    if (valid) {
      const newExam = {
        idLesson: idLessonNumber,
        nameLesson: inputValue.nameLesson,
        describe: inputValue.describe,
        image: inputValue.image,
        dateAdd: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        examTurn: 0,
      };
      await dispatch(addExam(newExam));
      setShow(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImage(url);
          setInputValue((prev) => ({
            ...prev,
            image: url,
          }));
        });
      });
    }
  };

  const handleEdit = async () => {
    let valid = true;
    if (!examEdit?.nameLesson) {
      setError((prev) => ({
        ...prev,
        nameLesson: "Tên đề thi không được để trống",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, nameLesson: "" }));
    }

    if (!examEdit?.describe) {
      setError((prev) => ({ ...prev, describe: "Vui lòng nhập mô tả" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, describe: "" }));
    }

    if (valid && examEdit) {
      const updatedExam = {
        id: examEdit.id,
        idLesson: idLessonNumber,
        nameLesson: examEdit.nameLesson,
        describe: examEdit.describe,
        dateAdd: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        examTurn: examEdit.examTurn,
        level: examEdit.level,
      };
      await dispatch(updateExam(updatedExam));
      setShowEdit(false);
    }
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (examEdit) {
      setExamEdit((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteExam(id));
    setExamDelete(null);
    if (idLessonNumber) {
      await dispatch(getAllExam(idLessonNumber));
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Quản lí đề thi</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm đề thi
              </Button>
              {/* Modal thêm đề thi */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm đề thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formNameLesson">
                      <Form.Label>Tên đề thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên đề thi"
                        name="nameLesson"
                        value={inputValue.nameLesson}
                        onChange={handleChange}
                      />
                      {error.nameLesson && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameLesson}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescribe">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={inputValue.describe}
                        onChange={handleChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.describe}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formImage">
                      <Form.Label>Hình ảnh</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleUploadChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleAdd}>
                    Thêm đề thi
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Modal sửa đề thi */}
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa đề thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formNameLessonEdit">
                      <Form.Label>Sửa đề thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên đề thi"
                        name="nameLesson"
                        value={examEdit?.nameLesson || ""}
                        onChange={handleExamChange}
                      />
                      {error.nameLesson && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameLesson}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescribeEdit">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={examEdit?.describe || ""}
                        onChange={handleExamChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.describe}
                        </span>
                      )}
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseEdit}>
                    Hủy
                  </Button>
                  <Button variant="primary" onClick={handleEdit}>
                    Cập nhật
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="user-info">
            <div className="sort">
              <Form.Select aria-label="Sắp xếp theo">
                <option>Sắp xếp theo</option>
                <option value="1">Ngày tạo</option>
                <option value="2">Từ A-Z</option>
                <option value="3">Từ Z-A</option>
                <option value="4">Độ khó</option>
                <option value="5">Lượt thi nhiều nhất</option>
                <option value="6">Lượt thi ít nhất</option>
              </Form.Select>
            </div>
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Tìm kiếm ở đây" />
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              alt="User Icon"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng đề thi của {exam}</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên chương</th>
                  <th>Ngày tạo</th>
                  <th>Lượt thi</th>
                  <th>Mô tả</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {examState.map((exam: Exam, index: number) => (
                  <tr key={exam.id}>
                    <td>{index + 1}</td>
                    <td style={{ cursor: "pointer" }}>
                      <p onClick={() => handleClick(exam.id, exam)}>
                        {exam.nameLesson}
                      </p>
                    </td>
                    <td>{exam.dateAdd}</td>
                    <td>{exam.examTurn}</td>
                    <td>{exam.describe}</td>
                    <td className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(exam)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => setExamDelete(exam)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {examDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setExamDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>Bạn chắc chắn muốn xóa {examDelete.nameLesson}?</p>
                  </div>
                  <div className="modal-footer-footer">
                    <Button variant="light" onClick={() => setExamDelete(null)}>
                      Hủy
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(examDelete.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <br />
            <div className="statistical">
              <div className="total-records">
                <p>Hiển thị 10/20 bản ghi</p>
              </div>
              <div className="pagination">
                <Form.Select aria-label="Hiển thị bản ghi">
                  <option value="10">Hiển thị 10 bản ghi trên trang</option>
                  <option value="20">Hiển thị 20 bản ghi trên trang</option>
                  <option value="50">Hiển thị 50 bản ghi trên trang</option>
                  <option value="100">Hiển thị 100 bản ghi trên trang</option>
                </Form.Select>
                <div className="button">
                  <Button>Pre</Button>
                  <Button>1</Button>
                  <Button>2</Button>
                  <Button>Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

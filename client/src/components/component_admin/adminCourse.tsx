"use client";
import "@/styles/styleAdmin/ManagerUser.scss";
import "@/styles/styleAdmin/modal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  searchCourse,
  sortCourse,
  updateCourse,
} from "@/services/course.service";
import { AddCourse, Course } from "../../interface/admin";
import { format } from "date-fns";
import { storage } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function AdminCourse() {
  const [image, setImage] = useState<string>("");
  const route = useRouter();
  const courseState = useSelector((state: any) => state.courses.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  const handleClick = (id: number, course: Course) => {
    route.push(`/adminSubject/${course.nameCourse}/${id}`);
  };
  console.log(courseState);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (course: Course) => {
    setCourseEdit(course);
    setShowEdit(true);
  };

  const resetData = () => {
    setInputValue({
      nameCourse: "",
      describe: "",
      image: "",
    });
  };

  // Hàm thêm khóa học
  const [inputValue, setInputValue] = useState<AddCourse>({
    nameCourse: "",
    describe: "",
    image: "",
  });
  const [error, setError] = useState({
    nameCourse: "",
    describe: "",
  });
  const [courseDelete, setCourseDelete] = useState<Course | null>(null);

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.nameCourse) {
      error.nameCourse = "Tên khóa thi không được để trống";
      valid = false;
    } else {
      error.nameCourse = "";
    }

    if (!inputValue.describe) {
      error.describe = "Vui lòng nhập mô tả khóa học";
      valid = false;
    } else {
      error.describe = "";
    }

    setError({ ...error });

    if (valid) {
      const newCourse = {
        ...inputValue,
        nameCourse: inputValue.nameCourse,
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        describe: inputValue.describe,
      };

      await dispatch(addCourse(newCourse));
      await dispatch(getAllCourse());
      resetData();
      setShow(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleUploadChange = (e: any) => {
    let image: any = e.target.files[0];
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot: any) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        setImage(image);
        setInputValue({
          ...inputValue,
          image: url,
        });
      });
    });
  };

  // Hàm xóa khóa học
  const handleDelete = async (id: number) => {
    await dispatch(deleteCourse(id));
    await dispatch(getAllCourse());
    setCourseDelete(null);
  };

  // Hàm sửa khóa học
  const [courseEdit, setCourseEdit] = useState<Course | null>(null);
  const handleCourseEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (courseEdit) {
      setCourseEdit({
        ...courseEdit,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleEdit = async () => {
    console.log(123456);
    let valid = true;
    if (!courseEdit?.nameCourse) {
      error.nameCourse = "Tên khóa thi không được để trống";
      valid = false;
    } else {
      error.nameCourse = "";
    }

    if (!courseEdit?.describe) {
      error.describe = "Vui lòng nhập mô tả khóa học";
      valid = false;
    } else {
      error.describe = "";
    }

    setError({ ...error });
    if (valid && courseEdit) {
      await dispatch(
        updateCourse({
          id: courseEdit.id,
          nameCourse: courseEdit.nameCourse,
          created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
          describe: courseEdit.describe,
        })
      );
      await dispatch(getAllCourse());
      setShowEdit(false);
      console.log(124444454);
    }
  };

  // Hàm tìm kiếm khóa học
  const [search, setSearch] = useState<string>("");
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await dispatch(searchCourse(search));
  };

  // Hàm sắp xếp khóa học
  const handleSort = (sort: string) => {
    dispatch(sortCourse(sort));
  };

  return (
    <>
      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Quản lí khóa học</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm khóa thi
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm khóa thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên khóa thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên khóa"
                        name="nameCourse"
                        value={inputValue.nameCourse}
                        onChange={handleChange}
                      />
                      {error.nameCourse && (
                        <span style={{ color: "red", fontSize: 15 }}>
                          {error.nameCourse}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập mô tả khóa học</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={inputValue.describe}
                        onChange={handleChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 15 }}>
                          {error.describe}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Hình ảnh</Form.Label>
                      <Form.Control
                        type="file"
                        placeholder="Chọn hình ảnh"
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
                    Thêm khóa thi
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa khóa thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên khóa thi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên khóa"
                        name="nameCourse"
                        value={courseEdit?.nameCourse || ""}
                        onChange={handleCourseEditChange}
                      />
                      {error.nameCourse && (
                        <span style={{ color: "red", fontSize: 15 }}>
                          {error.nameCourse}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập mô tả khóa</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={courseEdit?.describe || ""}
                        onChange={handleCourseEditChange}
                      />
                      {error.describe && (
                        <span style={{ color: "red", fontSize: 15 }}>
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
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option>Sắp xếp theo</option>
                <option value="asc">Từ A-Z</option>
                <option value="desc">Từ Z-A</option>
              </Form.Select>
            </div>
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm ở đây"
                onChange={handleSearch}
                value={search}
              />
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="table-wrapper">
          <div className="title">
            <h3 className="main-title">Bảng quản lí khóa học</h3> <br />
          </div>
          <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khóa học học</th>
                  <th>Ngày tạo</th>
                  <th>Mô tả</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {courseState.map((course: Course, index: number) => (
                  <tr key={course.id}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="" onClick={() => handleClick(course.id, course)}>
                        {course.nameCourse}
                      </a>
                    </td>
                    <td>{course.created_at}</td>
                    <td>{course.describe}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(course)}
                      >
                        Sửa
                      </Button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => setCourseDelete(course)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courseDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setCourseDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>Bạn chắc chắn muốn xóa {courseDelete?.nameCourse}?</p>
                  </div>
                  <div className="modal-footer-footer">
                    <button
                      className="btn btn-light"
                      onClick={() => setCourseDelete(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(courseDelete.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}

            <br />
            <div className="statistical">
              <div className="total-records">
                <p>Hiển thị 5/{courseState.length} bản ghi</p>
              </div>
              <div className="pagination">
                <Form.Select aria-label="Default select example">
                  <option value="1">Hiển thị 10 bản ghi trên trang</option>
                  <option value="2">Hiển thị 20 bản ghi trên trang</option>
                  <option value="3">Hiển thị 50 bản ghi trên trang</option>
                  <option value="4">Hiển thị 100 bản ghi trên trang</option>
                </Form.Select>
                <div className="button">
                  <button>Pre</button>
                  <button>1</button>
                  <button>2</button>
                  <button>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

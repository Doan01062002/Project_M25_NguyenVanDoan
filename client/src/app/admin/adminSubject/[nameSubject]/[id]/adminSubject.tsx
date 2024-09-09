"use client";
import { useParams, useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubject,
  deleteSubject,
  getAllSubject,
  updateSubject,
} from "@/services/subject.service";
import { AddSubject, Subject } from "@/interface/admin";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { sortCourse } from "@/services/course.service";

export default function AdminSubject() {
  const [image, setImage] = useState<string>("");
  const [subjectDelete, setSubjectDelete] = useState<Subject | null>(null);
  const router = useRouter();
  const subjectState = useSelector((state: any) => state.subjects.subject);
  // console.log(subjectState);

  const dispatch = useDispatch();
  const { course, id }: { course: string; id: any } = useParams();
  console.log(id, course);

  useEffect(() => {
    if (id) {
      dispatch(getAllSubject(parseInt(id)));
      console.log("dữ liệu môn học", subjectState);
    }
  }, [dispatch, id]);

  const handleTab = (id: number, subject: Subject) => {
    router.push(`/admin/adminExam/${subject.nameSubject}/${id}`);
  };

  const [show, setShow] = useState(false);
  const resetData = () => {
    setInputValue({
      nameSubject: "",
      describe: "",
      image: "",
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (subject: Subject) => {
    setSubjectEdit(subject);
    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const [inputValue, setInputValue] = useState<AddSubject>({
    nameSubject: "",
    describe: "",
    image: "",
  });

  const [error, setError] = useState({
    nameSubject: "",
    describe: "",
  });

  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.nameSubject) {
      error.nameSubject = "Tên môn thi không được để trống";
      valid = false;
    } else {
      error.nameSubject = "";
    }

    if (!inputValue.describe) {
      error.describe = "Vui lòng nhập mô tả";
      valid = false;
    } else {
      error.describe = "";
    }

    setError({ ...error });

    if (valid) {
      const newSubject = {
        ...inputValue,
        idCourse: id,
        nameSubject: inputValue.nameSubject,
        describe: inputValue.describe,
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      };
      await dispatch(addSubject(newSubject));
      setShow(false);
      resetData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleUploadChange = (e: any) => {
    let image: any = e.target.files[0];
    console.log(image);
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(image);
        setInputValue({
          ...inputValue,
          image: url,
        });
      });
    });
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteSubject(id));
    setSubjectDelete(null);
    await dispatch(getAllSubject());
  };

  const [subjectEdit, setSubjectEdit] = useState<Subject | null>(null);
  const handleSubjectEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subjectEdit) {
      setSubjectEdit({
        ...subjectEdit,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEdit = async () => {
    let valid = true;
    if (!subjectEdit?.nameSubject) {
      error.nameSubject = "Tên môn thi không được để trống";
      valid = false;
    } else {
      error.nameSubject = "";
    }

    if (!subjectEdit?.describe) {
      error.describe = "Vui lòng nhập mô tả";
      valid = false;
    }

    setError({ ...error });

    if (valid && subjectEdit) {
      await dispatch(
        updateSubject({
          id: subjectEdit.id,
          idCourse: id,
          nameSubject: subjectEdit.nameSubject,
          created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
          describe: subjectEdit.describe,
        })
      );
      setShowEdit(false);
    }
  };

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
              <h2>Quản lí môn thi</h2>
            </div>
            <div className="addSubject">
              <Button variant="primary" onClick={handleShow}>
                + Thêm môn học
              </Button>

              {/* Form thêm môn thi */}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thêm môn thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên môn học</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên môn"
                        name="nameSubject"
                        value={inputValue.nameSubject}
                        onChange={handleChange}
                      />
                      {error.nameSubject && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameSubject}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập mô tả</Form.Label>
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
                    Thêm môn thi
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Form sửa môn thi */}
              <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                  <Modal.Title>Sửa môn thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập tên môn học</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên môn"
                        name="nameSubject"
                        value={subjectEdit?.nameSubject || ""}
                        onChange={handleSubjectEditChange}
                      />
                      {error.nameSubject && (
                        <span style={{ color: "red", fontSize: 14 }}>
                          {error.nameSubject}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhập mô tả</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả"
                        name="describe"
                        value={subjectEdit?.describe || ""}
                        onChange={handleSubjectEditChange}
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
              <input type="text" placeholder="Tìm kiếm ở đây" />
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/005/791/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="table-wrapper">
          <div className="title">
            <h3 className="main-title">Bảng quản lí môn thi của {course}</h3>{" "}
          </div>
          <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Tên môn học</th>
                  <th>Ngày tạo</th>
                  <th>Mô tả</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {subjectState.map((subject: Subject) => (
                  <tr key={subject.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td style={{ cursor: "pointer" }}>
                      <p onClick={() => handleTab(subject.id, subject)}>
                        {subject.nameSubject}
                      </p>
                    </td>
                    <td>{subject.created_at}</td>
                    <td>{subject.describe}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(subject)}
                      >
                        {" "}
                        Sửa
                      </Button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setSubjectDelete(subject)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            {subjectDelete && (
              <div className="overlay">
                <div className="modal-custom">
                  <div className="modal-header-custom">
                    <h5>Xác nhận</h5>
                    <i
                      className="fas fa-xmark"
                      onClick={() => setSubjectDelete(null)}
                    />
                  </div>
                  <div className="modal-body-custom">
                    <p>Bạn chắc chắn muốn xóa {subjectDelete?.nameSubject}?</p>
                  </div>
                  <div className="modal-footer-footer">
                    <button
                      className="btn btn-light"
                      onClick={() => setSubjectDelete(null)}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(subjectDelete.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="statistical">
              <div className="total-records">
                <p>Hiển thị 10/20 bản ghi</p>
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

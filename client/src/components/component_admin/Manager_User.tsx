"use client";
import "@/styles/styleAdmin/ManagerUser.scss";
import "@/styles/styleAdmin/modal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getAllUser,
  searchUser,
  sortUser,
  updateUserStatus,
} from "@/services/user.service";
import { Account, Users } from "../../interface/admin";
import { format } from "date-fns";
import { paginateUser } from "@/services/user.service"; // Import API phân trang

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function AdminUser() {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [limit, setLimit] = useState(3); // Số bản ghi mỗi trang
  const total = useSelector((state: any) => state.users.total); // Tổng số user
  const userState = useSelector((state: any) => state.users.user);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<Account>({
    id: Math.ceil(Math.random() * 10000),
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [shows, setShows] = useState(false);

  const reset = () => {
    setInputValue({
      id: 0,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleClose = () => setShows(false);
  const handleShow = () => setShows(true);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [filterUser, setFilterUser] = useState<Users[]>([]);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    setFilterUser(userState);
  }, [userState]);

  const [show, setShow] = useState(false);

  const handleCloses = () => setShow(false);
  const handleShows = (id: number) => {
    const showInfo = userState.find((user: Users) => user.id === id);
    console.log(showInfo);
    if (showInfo) {
      setSelectedUser(showInfo);
      setShow(true);
    }
  };

  // Hàm thêm user
  const handleAddUser = () => {
    let valid = true;
    if (!inputValue.username) {
      error.username = "Tên tài khoản không được để trống";
      valid = false;
    } else {
      error.username = "";
    }

    if (!inputValue.email) {
      error.email = "Email không được để trống";
      valid = false;
    } else if (!validateEmail(inputValue.email)) {
      error.email = "Email không đúng định dạng";
      valid = false;
    } else if (
      userState.some((existUser: any) => existUser.email === inputValue.email)
    ) {
      error.email = "Email đã tồn tại";
      valid = false;
    } else {
      error.email = "";
    }

    if (!inputValue.password) {
      error.password = "Mật khẩu không được để trống";
      valid = false;
    } else {
      error.password = "";
      valid = true;
    }

    if (!inputValue.confirmPassword) {
      error.confirmPassword = "Xác nhận mật khẩu không được để trống";
      valid = false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      error.confirmPassword = "Mật khẩu không khớp";
      valid = false;
    } else {
      error.confirmPassword = "";
      valid = true;
    }

    setError({ ...error });

    if (valid) {
      const newUser = {
        id: userState.length + 1,
        name: inputValue.username,
        email: inputValue.email,
        password: inputValue.password,
        confirmPassword: inputValue.confirmPassword,
        status: 0,
        image:
          "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        address: "",
      };
      dispatch(addUser(newUser));
      dispatch(getAllUser());
      setShows(false);
      reset();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm mở modal xác nhận chặn và bỏ chặn
  const handleShowBlockModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowBlockModal(true);
  };

  const handleHideBlockModal = () => {
    setSelectedUserId(null);
    setShowBlockModal(false);
  };

  const handleShowUnblockModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowUnblockModal(true);
  };

  const handleHideUnblockModal = () => {
    setSelectedUserId(null);
    setShowUnblockModal(false);
  };

  // Hàm chặn và bỏ chặn
  const handleBlockUser = (e: any) => {
    e.preventDefault();
    if (selectedUserId !== null) {
      dispatch(updateUserStatus({ id: selectedUserId, status: 1 }));
      dispatch(getAllUser()); // Refresh the user list
      handleHideBlockModal();
    }
  };

  const handleUnblockUser = (e: any) => {
    e.preventDefault();
    if (selectedUserId !== null) {
      dispatch(updateUserStatus({ id: selectedUserId, status: 0 }));
      dispatch(getAllUser()); // Refresh the user list
      handleHideUnblockModal();
    }
  };

  // Hàm tìm kiếm user
  const [search, setSearch] = useState<string>("");
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (!searchValue) {
      setFilterUser(userState);
    } else {
      const result = await dispatch(searchUser(searchValue));
      setFilterUser(result.payload);
    }
  };

  const handleSort = (order: string) => {
    dispatch(sortUser(order));
  };

  useEffect(() => {
    dispatch(paginateUser({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const totalPages = Math.ceil(total / limit); // Tổng số trang

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Quản lí tài khoản</h2>
            </div>
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
          </div>
          <div className="user-info">
            <Modal show={shows} onHide={handleCloses}>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nhập tên tài khoản</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      name="username"
                      value={inputValue.username}
                      onChange={handleChange}
                    />
                    {error.username && (
                      <span style={{ color: "red", fontSize: 15 }}>
                        {error.username}
                      </span>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nhập email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập email"
                      name="email"
                      value={inputValue.email}
                      onChange={handleChange}
                    />
                    {error.email && (
                      <span style={{ color: "red", fontSize: 15 }}>
                        {error.email}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nhập mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      name="password"
                      value={inputValue.password}
                      onChange={handleChange}
                    />
                    {error.password && (
                      <span style={{ color: "red", fontSize: 15 }}>
                        {error.password}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Xác nhận mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={inputValue.confirmPassword}
                      placeholder="Nhập xác nhận mật khẩu"
                      onChange={handleChange}
                    />
                    {error.confirmPassword && (
                      <span style={{ color: "red", fontSize: 15 }}>
                        {error.confirmPassword}
                      </span>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Hủy
                </Button>
                <Button variant="primary" onClick={handleAddUser} type="button">
                  Thêm tài khoản
                </Button>
              </Modal.Footer>
            </Modal>
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
            <h3 className="main-title">Bảng thống kê tài khoản</h3> <br />
          </div>
          <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên tài khoản</th>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th>Địa chỉ</th>
                  <th className="w-52">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {filterUser.map((user: Users, index: number) => (
                  <tr
                    key={user.id}
                    style={{ opacity: user.status === 1 ? 0.5 : 1 }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img src={user.image} alt="" />
                    </td>
                    <td>
                      <a href={`/adminUser/${user.name}`}>{user.name}</a>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>{user.address}</td>
                    <td className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleShows(user.id)}
                      >
                        Xem
                      </Button>
                      {user.status === 1 ? (
                        <Button
                          variant="success"
                          onClick={() => handleShowUnblockModal(user.id)}
                        >
                          Bỏ chặn
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => handleShowBlockModal(user.id)}
                        >
                          Chặn
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal show={show} onHide={handleCloses}>
              <Modal.Header closeButton>
                <Modal.Title>Thông tin chi tiết</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedUser && (
                  <div style={{ display: "flex", gap: 50 }}>
                    <div>
                      <p>Tên tài khoản: {selectedUser.name}</p>
                      <p>Email: {selectedUser.email}</p>
                      <p>
                        Trạng thái:{" "}
                        {selectedUser.status === 0 ? "Hoạt động" : "Bị chặn"}
                      </p>
                      <p>Ngày đăng ký: {selectedUser.created_at}</p>
                    </div>
                    <div>
                      <img
                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                        alt=""
                        className="w-32 h-32"
                      />
                    </div>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloses}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
            <br />
            <div className="statistical">
              <div className="total-records">
                <p>Hiển Thị số lượng người dùng</p>
              </div>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Pre
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal show={showBlockModal} onHide={handleHideBlockModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận chặn tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn chặn tài khoản {selectedUser?.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideBlockModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleBlockUser}>
              Chặn
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUnblockModal} onHide={handleHideUnblockModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận bỏ chặn tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn bỏ chặn tài khoản {selectedUser?.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideUnblockModal}>
              Hủy
            </Button>
            <Button variant="success" onClick={handleUnblockUser}>
              Bỏ chặn
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

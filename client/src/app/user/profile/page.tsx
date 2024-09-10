"use client";
import { Button, Modal } from "react-bootstrap";
import Footer from "@/components/component_user/Footer";
import Header from "@/components/component_user/Header";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import axios from "axios";
import { FieldTimeOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateUser } from "@/services/user.service";
import { EditProfiles } from "@/interface/user";

export default function Profile() {
  const [account, setAccount] = useState(() => {
    const storedAccount = JSON.parse(localStorage.getItem("checkUser") || "{}");
    return storedAccount;
  });
  const [image, setImage] = useState<string>(account.image || "");
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [inputValue, setInputValue] = useState<EditProfiles>({
    name: account.name || "",
    email: account.email || "",
    address: account.address || "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    address: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const storedAccount = JSON.parse(localStorage.getItem("checkUser") || "{}");
    setAccount(storedAccount);
    setImage(storedAccount.image || "");
    setInputValue({
      name: storedAccount.name || "",
      email: storedAccount.email || "",
      address: storedAccount.address || "",
    });
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowImageModal = () => setShowImageModal(true);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        setImage(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSaveImage = async () => {
    try {
      const updatedAccount = { ...account, image };
      localStorage.setItem("checkUser", JSON.stringify(updatedAccount));
      await axios.put(
        `http://localhost:8080/user/${account.id}`,
        updatedAccount
      );
      setAccount(updatedAccount);
      handleCloseImageModal();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleSaveChanges = async () => {
    let valid = true;
    if (!inputValue.name) {
      setError((prev) => ({
        ...prev,
        name: "Tên tài khoản không được để trống",
      }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, name: "" }));
    }

    if (!inputValue.email) {
      setError((prev) => ({ ...prev, email: "Email không được để trống" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }

    if (valid) {
      try {
        const updatedAccount = { ...account, ...inputValue };
        localStorage.setItem("checkUser", JSON.stringify(updatedAccount));
        await dispatch(updateUser(updatedAccount)).unwrap();
        setAccount(updatedAccount);
        handleCloseModal(); // Close modal after saving changes
      } catch (error: any) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
          <div className="w-1/3 bg-gray-200 p-4 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <UserOutlined />
              <p className="ml-2 text-lg font-semibold">Thông tin cá nhân</p>
            </div>
            <div className="flex items-center mb-4">
              <FieldTimeOutlined />
              <a href="/user/history" className="ml-2 text-lg text-black">
                Lịch sử làm bài
              </a>
            </div>
          </div>

          <div className="w-2/3 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              Thông tin cá nhân
            </h1>
            <div className="flex gap-8">
              <div className="flex-shrink-0">
                <img
                  src={image}
                  className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
                  alt="Profile"
                />
                <button
                  onClick={handleShowImageModal}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Thay đổi ảnh
                </button>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">Tên tài khoản</h2>
                  <p className="text-lg">{account.name}</p>
                </div>
                <hr />
                <div className="my-4">
                  <h3 className="text-lg font-semibold">Email:</h3>
                  <p className="text-lg">{account.email}</p>
                </div>
                <hr />
                <div className="my-4">
                  <h3 className="text-lg font-semibold">Địa chỉ:</h3>
                  <p className="text-lg">{account.address || "Chưa có"}</p>
                </div>
                <hr />
                <div className="mt-4 text-right">
                  <button
                    onClick={handleShowModal}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Đổi thông tin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChanges();
            }}
            className="space-y-4"
          >
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Tên tài khoản
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={inputValue.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  error.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Nhập tên"
              />
              {error.name && (
                <p className="mt-1 text-sm text-red-500">{error.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  error.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Nhập email"
              />
              {error.email && (
                <p className="mt-1 text-sm text-red-500">{error.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={inputValue.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Upload Modal */}
      <Modal
        show={showImageModal}
        onHide={handleCloseImageModal}
        className="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi ảnh đại diện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImageModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveImage}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
}

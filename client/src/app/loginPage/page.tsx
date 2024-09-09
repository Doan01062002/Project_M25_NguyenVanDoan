"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUser } from "@/services/user.service";
import "@/styles/styleLoginPage/loginPage.css";
import { useRouter } from "next/navigation";
import {
  FacebookOutlined,
  GooglePlusOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Modal } from "antd"; // Import Modal từ Ant Design

export default function Login_Register() {
  const router = useRouter();
  const [signUpMode, setSignUpMode] = useState<boolean>(false);

  const handleSignUpClick = () => setSignUpMode(true);
  const handleSignInClick = () => setSignUpMode(false);

  const users = useSelector((state: any) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const [valueFullname, setValueFullname] = useState<string>("");
  const [valueUsername, setValueUsername] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueComfirmPassword, setValueConfirmPassword] = useState<string>("");

  const functionValueFullname = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueFullname(e.target.value);
  const functionValueUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueUsername(e.target.value);
  const functionValueEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueEmail(e.target.value);
  const functionValuePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValuePassword(e.target.value);
  const functionValueConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setValueConfirmPassword(e.target.value);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const addNewUser = (e: React.MouseEvent) => {
    e.preventDefault();

    const checkUsername = users.find(
      (item: any) => item.name === valueUsername
    );
    const checkEmailRegister = users.find(
      (item: any) => item.email === valueEmail
    );

    if (!valueFullname) {
      showModal("Fullname is required.");
    } else if (!valueUsername) {
      showModal("Username is required.");
    } else if (!validateEmail(valueEmail)) {
      showModal("Invalid email address.");
    } else if (valuePassword !== valueComfirmPassword) {
      showModal("Passwords do not match.");
    } else if (checkUsername) {
      showModal("Username already exists.");
    } else if (checkEmailRegister) {
      showModal("Email is already registered.");
    } else {
      const newUser = {
        id: users.length + 1,
        name: valueUsername,
        email: valueEmail,
        password: valuePassword,
        confirmPassword: valueComfirmPassword,
        status: 0, // default status
        image: "", // no image initially
        created_at: new Date().toLocaleString(),
        address: "",
      };
      dispatch(addUser(newUser));
      setValueFullname("");
      setValueUsername("");
      setValueEmail("");
      setValuePassword("");
      setValueConfirmPassword("");
      setSignUpMode(false);
    }
  };

  const [valueUsernameLogin, setValueUsernameLogin] = useState<string>("");
  const [valuePasswordLogin, setValuePasswordLogin] = useState<string>("");

  const functionValueUsernameLogin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValueUsernameLogin(e.target.value);
  const functionValuePasswordLogin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValuePasswordLogin(e.target.value);

  const loginUser = (e: React.MouseEvent) => {
    e.preventDefault();
    const checkUsername = users.find(
      (item: any) => item.name === valueUsernameLogin
    );

    if (!checkUsername) {
      showModal("Account or password is incorrect");
    } else if (valuePasswordLogin !== checkUsername.password) {
      showModal("Account or password is incorrect");
    } else if (checkUsername.status === 1) {
      showModal("Your account has been locked");
      return;
    } else {
      setValueUsernameLogin("");
      setValuePasswordLogin("");
      localStorage.setItem("checkUser", JSON.stringify(checkUsername));
      router.push("/");
    }
  };

  return (
    <div className={`container_login ${signUpMode ? "sign-up-mode" : ""}`}>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        title="Notification"
      >
        <p>{modalMessage}</p>
      </Modal>

      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                value={valueUsernameLogin}
                type="text"
                placeholder="Username"
                onChange={functionValueUsernameLogin}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                value={valuePasswordLogin}
                type="password"
                placeholder="Password"
                onChange={functionValuePasswordLogin}
              />
            </div>
            <button onClick={loginUser} className="btn solid">
              Login
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FacebookOutlined />
              </a>
              <a href="#" className="social-icon">
                <TwitterOutlined />
              </a>
              <a href="#" className="social-icon">
                <GooglePlusOutlined />
              </a>
              <a href="#" className="social-icon">
                <LinkedinOutlined />
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                value={valueFullname}
                type="text"
                placeholder="Fullname"
                onChange={functionValueFullname}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                value={valueUsername}
                type="text"
                placeholder="Username"
                onChange={functionValueUsername}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                value={valueEmail}
                type="email"
                placeholder="Email"
                onChange={functionValueEmail}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                value={valuePassword}
                type="password"
                placeholder="Password"
                onChange={functionValuePassword}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                value={valueComfirmPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={functionValueConfirmPassword}
              />
            </div>
            <button onClick={addNewUser} className="btn">
              Sign up
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FacebookOutlined />
              </a>
              <a href="#" className="social-icon">
                <TwitterOutlined />
              </a>
              <a href="#" className="social-icon">
                <GooglePlusOutlined />
              </a>
              <a href="#" className="social-icon">
                <LinkedinOutlined />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Welcome! Join us by creating an account and stay connected with
              the community.
            </p>
            <button onClick={handleSignUpClick} className="btn transparent">
              Sign up
            </button>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2Fimageslogin_Register%2Flog.svg?alt=media&token=063e91e6-a06f-4c64-9d5a-692546d9d061"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Welcome back! Log in to access your account and enjoy the
              benefits.
            </p>
            <button onClick={handleSignInClick} className="btn transparent">
              Sign in
            </button>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2Fimageslogin_Register%2Fregister.svg?alt=media&token=3c193787-b0ac-4b77-9d6c-98fdf449de10"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import "../../styles/styleLoginAdmin/style.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "@/services/accountAdmin.service";
import { AccountAdmin } from "@/interface";

export default function Page() {
  const [valueAccount, setValueAccount] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [errorAccount, setErrorAccount] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  // Cấu hình hiển thị cơ bản
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>(".input");

    function addFocusClass(this: HTMLInputElement) {
      const parent = this.parentNode?.parentNode as HTMLElement;
      if (parent) {
        parent.classList.add("focus");
      }
    }

    function removeFocusClass(this: HTMLInputElement) {
      const parent = this.parentNode?.parentNode as HTMLElement;
      if (this.value === "" && parent) {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addFocusClass);
      input.addEventListener("blur", removeFocusClass);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addFocusClass);
        input.removeEventListener("blur", removeFocusClass);
      });
    };
  }, []);

  /**
   * Get admin
   */
  const accountAdmin: AccountAdmin = useSelector((state: any) => {
    return state.admin.admins;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  /**
   * check  admin
   */
  const route = useRouter();

  const handleValueAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueAccount(e.target.value);
  };

  const handleValuePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const handleLogin = () => {
    let hasError = false;
    if (valueAccount !== accountAdmin.accountName) {
      setErrorAccount("Account information is incorrect");
      hasError = true;
    }
    if (valuePassword !== accountAdmin.accountPassword) {
      setErrorPassword("Password is incorrect");
      hasError = true;
    }

    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
      setErrorAccount(null);
      setErrorPassword(null);
    }, 3000);

    if (!hasError) {
      localStorage.setItem("checkAdmin", JSON.stringify(accountAdmin));
      setValueAccount("");
      setValuePassword("");
      route.push("/admin");
    }
  };

  return (
    <>
      <title>Animated Login Form</title>
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap"
        rel="stylesheet"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <img className="wave" src="/images/wave.png" />
      <div className="container">
        <div className="img">
          <img src="/images/bg.svg" />
        </div>
        <div className="login-content">
          <form>
            <img style={{ marginLeft: "120px" }} src="/images/avatar.svg" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user" />
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  onChange={handleValueAccount}
                  type="text"
                  className="input"
                  value={valueAccount}
                />
              </div>
            </div>
            {errorAccount && (
              <p style={{ color: "red" }} className="error-message">
                {errorAccount}
              </p>
            )}
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" />
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  onChange={handleValuePassword}
                  type="password"
                  className="input"
                  value={valuePassword}
                />
              </div>
            </div>
            {errorPassword && (
              <p style={{ color: "red" }} className="error-message">
                {errorPassword}
              </p>
            )}
            <a href="#">Forgot Password?</a>
            <input
              onClick={handleLogin}
              type="button"
              className="btn"
              value="Login"
            />
          </form>
        </div>
      </div>
    </>
  );
}

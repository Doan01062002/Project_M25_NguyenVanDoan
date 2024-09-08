"use client";

import React, { useEffect, useState } from "react";
import "../../styles/styleAdmin/dashboard.css";
import Nav_Main from "../../components/component_admin/Nav_Main";
import Nav_Right from "../../components/component_admin/Nav_Right";
import { setCheckAdmin } from "../../util";
import Manager_User from "../../components/component_admin/Manager_User";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../services/accountAdmin.service";
import { useRouter } from "next/navigation";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AdminCourse from "@/components/component_admin/adminCourse";

const Dashboard: React.FC = () => {
  const [showMain, setShowMain] = useState<string>("dashboard");
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  // Active
  const toggleSidebar = (show: boolean): void => {
    const sideMenu = document.querySelector("aside");
    if (sideMenu) {
      sideMenu.style.display = show ? "block" : "none";
    }
  };

  // Logout

  const dispatch = useDispatch();

  const route = useRouter();

  useEffect(() => {
    dispatch(getAdmin());
  }, []);

  const handleLogout = () => {
    setCheckAdmin();
    route.push("/loginAdmin");
  };

  const handleItemClick = (item: string) => {
    setShowMain(item);
    setActiveItem(item);
  };

  return (
    <>
      <div className="containers">
        <aside>
          <div className="top">
            <div className="logo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Flogo.png?alt=media&token=018c46b8-3e94-4fbd-a405-f0283e15a92e"
                alt="Logo"
              />
              <h2>
                VN<span className="danger">SN</span>
              </h2>
            </div>
            <div
              className="close"
              id="close-btn"
              onClick={() => toggleSidebar(false)}
            >
              <span className="material-icons-sharp">close</span>
            </div>
          </div>
          <div className="sidebar">
            <a
              onClick={() => handleItemClick("dashboard")}
              href="#"
              className={activeItem === "dashboard" ? "active" : ""}
            >
              <HomeOutlined />
              <h3>Dashboard</h3>
            </a>
            <br />
            <a
              onClick={() => handleItemClick("managerUser")}
              href="#"
              className={activeItem === "managerUser" ? "active" : ""}
            >
              <UserOutlined />
              <h3>Users</h3>
            </a>
            <br />
            <a
              onClick={() => handleItemClick("managerCourse")}
              href="#"
              className={activeItem === "managerCourse" ? "active" : ""}
            >
              <BookOutlined />
              <h3>Courses</h3>
            </a>
            <br />
            <a
              onClick={() => handleItemClick("messages")}
              href="#"
              className={activeItem === "messages" ? "active" : ""}
            >
              <MailOutlined />
              <h3>Messages</h3>
              <span className="message-count">26</span>
            </a>
            <br />
            <a
              onClick={() => handleItemClick("settings")}
              href="#"
              className={activeItem === "settings" ? "active" : ""}
            >
              <SettingOutlined />
              <h3>Settings</h3>
            </a>

            <a
              href="#"
              onClick={handleLogout}
              className={activeItem === "logout" ? "active" : ""}
            >
              <LogoutOutlined />
              <h3>Logout</h3>
            </a>
          </div>
        </aside>
        {showMain === "dashboard" ? <Nav_Main></Nav_Main> : ""}
        {showMain === "managerUser" ? <Manager_User></Manager_User> : ""}
        {showMain === "managerCourse" ? <AdminCourse></AdminCourse> : ""}
        <Nav_Right></Nav_Right>
      </div>
    </>
  );
};

export default Dashboard;

import {
  AlertOutlined,
  MailOutlined,
  MoonOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

export default function Nav_Right() {
  /**
   *
   */
  const toggleSidebar = (show: boolean): void => {
    const sideMenu = document.querySelector("aside");
    if (sideMenu) {
      sideMenu.style.display = show ? "block" : "none";
    }
  };

  const toggleTheme = (): void => {
    document.body.classList.toggle("dark-theme-variables");

    const themeToggler = document.querySelector(".theme-toggler");
    if (themeToggler) {
      themeToggler
        .querySelector("span:nth-child(1)")
        ?.classList.toggle("active");
      themeToggler
        .querySelector("span:nth-child(2)")
        ?.classList.toggle("active");
    }
  };
  return (
    <div className="right">
      <div className="top">
        <button id="menu-btn" onClick={() => toggleSidebar(true)}>
          <span className="material-icons-sharp">menu</span>
        </button>
        <div className="theme-toggler" onClick={toggleTheme}>
          <AlertOutlined />
          <MoonOutlined />
        </div>
        <div className="profile">
          <div className="info">
            <p>
              Hey, <b>ADIM</b>
            </p>
            <small className="text-muted">Admin</small>
          </div>
          <div className="profile-photo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-1.jpg?alt=media&token=b5dc9d59-ec60-4a81-9f64-af16a2e7b4cf"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div className="recent-updates">
        <h2>Recent Updates</h2>
        <div className="updates">
          <div className="update">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-2.jpg?alt=media&token=187045ee-5861-4a71-901d-b39b939284f7" />
            </div>
            <div className="message">
              <p>
                <b>Mike Tyson</b> received his order of Night lion tech GPS
                drone.
              </p>
              <small className="text-muted">2 Minutes Ago</small>
            </div>
          </div>
          <div className="update">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-3.jpg?alt=media&token=b0af6181-9da8-4f6a-8a8d-f57d2c030eea" />
            </div>
            <div className="message">
              <p>
                <b>Diana Ayi</b> declined her order of 2 DJI Air 2S.
              </p>
              <small className="text-muted">5 Minutes Ago</small>
            </div>
          </div>
          <div className="update">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-4.jpg?alt=media&token=6e415777-8db0-4503-ae56-a071397cd63a" />
            </div>
            <div className="message">
              <p>
                <b>Mandy Roy</b> received his order of LARVENDER KF102 Drone.
              </p>
              <small className="text-muted">6 Minutes Ago</small>
            </div>
          </div>
        </div>
      </div>
      <div className="sales-analytics">
        <h2>Sales Analytics</h2>
        <div id="analytics">
          <div className="item online">
            <div className="icon">
              <ShoppingCartOutlined />
            </div>
            <div className="right">
              <div className="info">
                <h3>ONLINE ORDERS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="success">+39%</h5>
            </div>
          </div>
          <div className="item offline">
            <div className="icon">
              <MailOutlined />
            </div>
            <div className="right">
              <div className="info">
                <h3>OFFLINE ORDERS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="danger">-17%</h5>
            </div>
          </div>
          <div className="item customers">
            <div className="icon">
              <UserOutlined />
            </div>
            <div className="right">
              <div className="info">
                <h3>NEW CUSTOMERS</h3>
                <small className="text-muted">Last 24 Hours</small>
              </div>
              <h5 className="danger">+25%</h5>
            </div>
          </div>
        </div>
        <div className="item add-product">
          <div>
            <span className="material-icons-sharp">add</span>
            <h3>Add Product</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

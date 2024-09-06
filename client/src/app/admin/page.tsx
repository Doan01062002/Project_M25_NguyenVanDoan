"use client";

import React, { useEffect, useRef } from "react";
import "../../styles/styleAdmin/home.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAdmin } from "@/services/accountAdmin.service";
import { setCheckAdmin } from "@/util";

export default function Page() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const menuBarRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchFormRef = useRef<HTMLFormElement | null>(null);
  const searchButtonIconRef = useRef<HTMLElement | null>(null);
  const switchModeRef = useRef<HTMLInputElement | null>(null);

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

  // Hiển thị chuyển động

  useEffect(() => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener("click", function () {
        allSideMenu.forEach((i: any) => {
          i.parentElement.classList.remove("active");
        });
        li?.classList.add("active");
      });
    });

    const toggleSidebar = () => {
      sidebarRef.current?.classList.toggle("hide");
    };

    menuBarRef.current?.addEventListener("click", toggleSidebar);

    const handleSearchButtonClick = (e: Event) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchFormRef.current?.classList.toggle("show");
        if (searchFormRef.current?.classList.contains("show")) {
          searchButtonIconRef.current?.classList.replace("bx-search", "bx-x");
        } else {
          searchButtonIconRef.current?.classList.replace("bx-x", "bx-search");
        }
      }
    };

    searchButtonRef.current?.addEventListener("click", handleSearchButtonClick);

    const handleResize = () => {
      if (window.innerWidth > 576) {
        searchButtonIconRef.current?.classList.replace("bx-x", "bx-search");
        searchFormRef.current?.classList.remove("show");
      }
    };

    window.addEventListener("resize", handleResize);

    if (window.innerWidth < 768) {
      sidebarRef.current?.classList.add("hide");
    }

    const handleSwitchModeChange = () => {
      if (switchModeRef.current?.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    };

    switchModeRef.current?.addEventListener("change", handleSwitchModeChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      menuBarRef.current?.removeEventListener("click", toggleSidebar);
      searchButtonRef.current?.removeEventListener(
        "click",
        handleSearchButtonClick
      );
      switchModeRef.current?.removeEventListener(
        "change",
        handleSwitchModeChange
      );
    };
  }, []);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
        rel="stylesheet"
      />
      <title>AdminHub</title>
      <section id="sidebar" ref={sidebarRef}>
        <a href="#" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">AdminHub</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-shopping-bag-alt" />
              <span className="text">My Store</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-message-dots" />
              <span className="text">Message</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-group" />
              <span className="text">Team</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">Settings</span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" ref={menuBarRef} />
          <a href="#" className="nav-link">
            Categories
          </a>
          <form action="#" ref={searchFormRef}>
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button
                type="submit"
                className="search-btn"
                ref={searchButtonRef}
              >
                <i className="bx bx-search" ref={searchButtonIconRef} />
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden ref={switchModeRef} />
          <label htmlFor="switch-mode" className="switch-mode" />
          <a href="#" className="notification">
            <i className="bx bxs-bell" />
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="img/people.png" />
          </a>
        </nav>

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download" />
              <span className="text">Download PDF</span>
            </a>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check" />
              <span className="text">
                <h3>1020</h3>
                <p>New Order</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group" />
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle" />
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status process">Process</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <i className="bx bx-plus" />
                <i className="bx bx-filter" />
              </div>
              <ul className="todo-list">
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded" />
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

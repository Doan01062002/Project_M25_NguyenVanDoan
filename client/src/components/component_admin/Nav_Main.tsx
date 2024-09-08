export default function AdminHome() {
  return (
    <>
      <div className="main-content">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Thi online</span>
              <h2>Trang chủ</h2>
            </div>
          </div>
          <div className="user-info">
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

        <div className="card-container">
          <h3 className="main-title">Dữ liệu hôm nay</h3>
          <div className="card-wrapper">
            <div className="payment-card light-red">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>

            <div className="payment-card light-purple">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-purple"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>

            <div className="payment-card light-green">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-green"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>

            <div className="payment-card light-blue">
              <div className="card-header">
                <div className="amount">
                  <span className="title">Payment amount </span>
                  <span className="amount-value">500.000</span>
                </div>
                <i className="fas fa-dollar-sign icon dark-blue"></i>
              </div>
              <span className="card-detail">**** **** **** 3484</span>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng thống kê</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên tài khoản</th>
                  <th>Mật khẩu</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái hoạt động</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>hoang2005</td>
                  <td>hoang123</td>
                  <td>24/05/2023</td>
                  <td>Đang hoạt động</td>
                  <td>
                    <button className="btn btn-primary">Chặn</button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

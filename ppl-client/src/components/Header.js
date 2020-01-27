import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header_lft">
        <div className="logo">
          <a href="#">
            <img src="images/logo.png" />
          </a>
        </div>
        <div className="navigatn">
          <ul>
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#"> E-Coupons </a>
            </li>
            <li>
              <a href="#">E-Brands </a>
            </li>
            <li>
              <a href="#"> Resuse Market </a>
            </li>
            <li>
              <a href="#"> Lost and Found</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header_rgt">
        <div className="flag_div">
          <img src="images/flag.png" />
        </div>
        <input type="text" placeholder="Search" className="txt_box" />
        <div className="msg_box">
          <a href="#">
            <span className="msg_count">100</span>
          </a>
        </div>
        <div className="info_div">
          <div className="image_div">
            {" "}
            <img src="images/pic.png" />{" "}
          </div>
          <div className="info_div1">Me</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

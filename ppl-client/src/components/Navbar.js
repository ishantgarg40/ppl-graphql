import React from "react";

const Navbar = () => {
  return (
    <>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link
        href="css/bootstrap-responsive.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar" /> <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="brand" href>
              PPL
            </a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="images/pic_small.png" />
              </div>
              <div className="pro_txt">
                Me
                <b className="caret" />
              </div>
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="dLabel"
              >
                <li>
                  <a tabIndex={-1} href="#">
                    My Profile
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="#">
                    Message Box
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="#">
                    Change Language
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  {" "}
                  <a href>Home</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Coupons</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Brands</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>Resuse Market</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>Lost and Found</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

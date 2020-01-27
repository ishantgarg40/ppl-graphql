import React from "react";

const Posts = props => {
  return (
    <div className="contnt_2">
      <div className="div_a">
        <div className="div_title">
          User Interface PSD Source files Web Designing for web
        </div>
        <div className="btm_rgt">
          <div className="btm_arc">Cats</div>
        </div>
        <div className="div_top">
          <div className="div_top_lft">
            <img src="images/img_6.png" />
            Steave Waugh
          </div>
          <div className="div_top_rgt">
            <span className="span_date">02 Jan 2014</span>
            <span className="span_time">11:15am</span>
          </div>
        </div>
        <div className="div_image">
          <img src="images/lft_img.png" alt="pet" />
        </div>
        <div className="div_btm">
          <div className="btm_list">
            <ul>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="images/icon_001.png" alt="share" />
                  </span>
                  Share
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="images/icon_002.png" alt="share" />
                  </span>
                  Flag
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="images/icon_003.png" alt="share" />
                  </span>
                  0 Likes
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="btn_icon">
                    <img src="images/icon_004.png" alt="share" />
                  </span>
                  4 Comments
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;

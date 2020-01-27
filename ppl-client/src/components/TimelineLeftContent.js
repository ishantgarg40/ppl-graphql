import React from "react";
import ProfileInfo from "./ProfileInfo";
import Posts from "./Posts";

const TimelineLeftContent = props => {
  return (
    <div className="content_lft">
      <ProfileInfo {...props} />
      <Posts />
    </div>
  );
};

export default TimelineLeftContent;

import React, { useState } from "react";
import PostUpload from "./PostUpload";
import Featured from "./Featured";
import Categories from "./Categories";

const TimelineRightContent = props => {
  const [openUploadPostModal, setOpenUploadPostModal] = useState(false);
  return (
    <div className="content_rgt">
      <PostUpload
        setOpenUploadPostModal={setOpenUploadPostModal}
        openUploadPostModal={openUploadPostModal}
      />
      <Categories />
      <Featured />
    </div>
  );
};

export default TimelineRightContent;

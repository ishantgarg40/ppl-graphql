import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { uploadPostMutation } from "../queries/queries";
import { useMutation } from "react-apollo";

const PostUpload = props => {
  const [postUpload, setPostUpload] = useState({
    category: "",
    filedata: null
  });

  const [uploadPostResult, { loading, error, data }] = useMutation(
    uploadPostMutation
  );

  const handleChange = event => {
    const { name, value } = event.target;
    setPostUpload({
      ...postUpload,
      [name]: value
    });
  };

  const handleSubmit =  event => {
    event.preventDefault();
    // uploadPostResult({
    //   variables
    // })
  };

  const handleOnDropping = file => {
    setPostUpload({ ...postUpload, filedata: file });
  };

  return (
    <>
      <div className="rght_btn">
        {" "}
        <span className="rght_btn_icon">
          <img src="images/btn_iconb.png" alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="images/btn_sep.png" alt="sep" />
        </span>{" "}
        <a
          onClick={() =>
            props.setOpenUploadPostModal(!props.openUploadPostModal)
          }
        >
          Upload Post
        </a>{" "}
      </div>
      {props.openUploadPostModal && (
        <div>
          <p>&nbsp;</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="category"
              placeholder="category for your post"
              required
              onChange={handleChange}
            />
            <Dropzone
              multiple={false}
              onDrop={file => {
                handleOnDropping(file[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <button type="submit">upload post</button>
          </form>
          <p>&nbsp;</p>
        </div>
      )}
    </>
  );
};

export default PostUpload;

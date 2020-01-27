import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import { addCategoryMutation } from "../queries/queries";

const Categories = props => {
  const [openUploadCategoryModal, setOpenUploadCategoryModal] = useState(false);

  const [addCategoryResult, { loading, error, data }] = useMutation(
    addCategoryMutation
  );
  const [category, setCategory] = useState({
    title: "",
    image: null
  });

  const handleChange = event => {
    const { value } = event.target;
    setCategory({ ...category, title: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addCategoryResult({
      variables: {
        name: category.title,
        filedata: category.image
      }
    });
  };

  const handleOnDropping = file => {
    setCategory({ ...category, image: file });
  };

  return (
    <>
      <div className="rght_btn">
        {" "}
        <span className="rght_btn_icon">
          <img src="images/btn_icona.png" alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="images/btn_sep.png" alt="sep" />
        </span>{" "}
        <a onClick={() => setOpenUploadCategoryModal(!openUploadCategoryModal)}>
          Add Categories
        </a>{" "}
      </div>
      {openUploadCategoryModal && (
        <div>
          <p>&nbsp;</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Add category here..."
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
            <button type="submit">Add Category</button>
          </form>
          <p>&nbsp;</p>
        </div>
      )}
      <div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">
          Categories
        </div>
        <div className="rght_list">
          <ul>
            <li>
              <a href="#">
                <span className="list_icon">
                  <img src="images/icon_01.png" alt="up" />
                </span>{" "}
                CATS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Categories;

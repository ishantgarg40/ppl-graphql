import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { fetchProfileInfoQuery } from "../queries/queries";

const ProfileInfo = props => {
  const [fetchProfileInfo, { loading, error, data }] = useLazyQuery(
    fetchProfileInfoQuery
  );

  useEffect(() => {
    fetchProfileInfo({
      variables: {
        token: localStorage.getItem("ppl_token")
      }
    });
  }, []);

  return (
    <div className="contnt_1">
      <div className="list_1"></div>
      <div className="timeline_div">
        <div className="timeline_div1">
          <div className="profile_pic">
            <img src="images/timeline_img1.png" />
            <div className="profile_text">
              <a href="#">Change Profile Pic</a>
            </div>
          </div>
          <div className="profile_info">
            <div className="edit_div">
              <button onClick={props.logout}>
                logout <img src="images/timeline_img.png" />
              </button>
            </div>
            <div className="profile_form">
              <ul>
                <li>
                  <div className="div_name1">Userame :</div>
                  <div className="div_name2">
                    {!loading && data && `${data.profileInfo.username}`}
                  </div>
                </li>
                <li>
                  <div className="div_name1">Name :</div>
                  <div className="div_name2">
                    {!loading &&
                      data &&
                      `${data.profileInfo.firstname} ${data.profileInfo.lastname}`}
                  </div>
                </li>
                <li>
                  <div className="div_name1">Description :</div>
                  <div className="div_name3">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside Account.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

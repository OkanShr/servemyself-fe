import "../../App.css";

import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { deleteUser, updateUser } from "../../api/userApi";
import { UserUpdateComponent } from "./UserUpdateComponent";

export const UserListItemComponent = (props) => {
  const { loginDetails, updateUserList } = props;
  const { username, name, surname, role, id } = props.user;
  const [showUpdate, setShowUpdate] = useState(false);

  const save = (e, values) => {
    e.preventDefault();
    updateUser(values, loginDetails.token)
      .then(() => {
        setShowUpdate(false);
        updateUserList();
      })
      .catch((e) => {
        alert(e);
        setShowUpdate(false);
      });
  };

  const deleteUserFunction = () => {
    deleteUser(id, loginDetails.token).then(() => {
      updateUserList();
    });
  };

  return (
    <div
      className="p-3 d-flex flex-row justify-content-between"
      id="listitemparent"
    >
      <div className="d-flex gap-4" id="listitem">
        <img
        alt="avatar"
          width="100"
          src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
        />
        <div>
          <h3 className="font-weight-bold ">{username}</h3>
          <h5>{`${name} - ${surname}`}</h5>
          <h5 className="text-danger">{role}</h5>
        </div>
      </div>
      <div className="d-flex gap-3" style={{ cursor: "pointer" }}>
        <MdDelete onClick={deleteUserFunction} size={30} color="red" />
        <MdModeEditOutline
          onClick={() => {
            setShowUpdate(true);
          }}
          size={30}
        />
      </div>
      <UserUpdateComponent
        save={save}
        user={props.user}
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
      />
    </div>
  );
};

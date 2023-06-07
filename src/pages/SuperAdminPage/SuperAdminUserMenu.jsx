import "../../App.css";

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createUserByRole, getAllUsers } from "../../api/userApi";
import { UserCreateComponent } from "../../components/UserOperationsComponent/UserCreateComponent";
import { UserListComponent } from "../../components/UserOperationsComponent/UserListComponent";
import { useNavigate } from "react-router";
import { logout } from "../../store/authentication";

export const SuperAdminUserMenu = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const [showCreate, setShowCreate] = useState(false);
  const [users, setUsers] = useState([]);

  const updateUserList = () => {
    getAllUsers(loginDetails.token).then((response) => {
      setUsers(response.data);
    });
  };
  const navigate = useNavigate();
  const logoutFunction = (e) => {
    navigate("../login");
    logout();
  };

  useEffect(() => {
    updateUserList();
  }, []);

  const create = (e, values) => {
    e.preventDefault();
    createUserByRole(values, loginDetails.token)
      .then(() => {
        updateUserList();
        setShowCreate(false);
      })
      .catch((e) => {
        alert(e);
        setShowCreate(false);
      });
  };

  return (
    <div id="body">
      <div>
        <div id="banner">
          <Button id="Lgbtn" onClick={logoutFunction}>
            Logout
          </Button>

          <h1 className="mt-2 mb-2">SuperAdminPage</h1>
        </div>
        <Button
          id="Lgbtn"
          onClick={() => navigate("../home")}
          className="mt-3 mb-3 d-flex btn-success"
          style={{ marginLeft: "auto" }}
        >
          Main Menu
        </Button>

        <Button
          id="Lgbtn"
          onClick={() => setShowCreate(true)}
          className="mb-3 d-flex btn-success"
          style={{ marginLeft: "auto" }}
        >
          Create New User
        </Button>
      </div>

      <UserListComponent
        updateUserList={updateUserList}
        users={users}
        loginDetails={loginDetails}
      />

      <UserCreateComponent
        create={create}
        loginDetails={loginDetails}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
      />
    </div>
  );
};

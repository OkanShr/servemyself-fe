import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createUser, createUserByRole, getAllUsers } from "../../api/userApi";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { UserCreateComponent } from "../../components/UserOperationsComponent/UserCreateComponent";
import { UserListComponent } from "../../components/UserOperationsComponent/UserListComponent";
import { Navigate, useNavigate } from "react-router";
import { login, logout } from "../../store/authentication";

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
    navigate("../login")
    logout();
  }

  useEffect(() => {
    updateUserList();
  }, []);

  const create = (e, values) => {
    e.preventDefault();
    console.log(values);
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
    <div className="m-3">
      <div>

      <Button id="btn" onClick={logoutFunction}>Logout</Button>

      <h1>SuperAdminPage</h1>

      </div>
      
      <UserDetailsComponent id="profileheader" user={loginDetails.user} />
      
      <div>


      <Button id="btn"
        onClick={() => navigate("../home")}
        className="mb-3 d-flex btn-success"
        style={{ marginLeft: "auto" }}
      >
        Main Menu
      </Button>

      <Button id="btn"
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

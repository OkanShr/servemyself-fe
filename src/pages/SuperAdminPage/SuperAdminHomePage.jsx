import "../../App.css"


import React from "react";
import { Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { useNavigate } from "react-router";
import { logout } from "../../store/authentication";

export const SuperAdminHomePage = () => {

  const loginDetails = useSelector((state) => state.auth.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFunction = (e) => {  
    e.preventDefault();
    dispatch(
      //Reducers to initial state
      logout()
    );
    navigate("../login")
  }

  return (
    
    <div  id="body">
      
      <div id="banner">
      <Button id="Lgbtn" onClick={logoutFunction}>Logout</Button>
      <UserDetailsComponent id="profileheader" user={loginDetails.user} />
      </div>
      <div id="form">
      <div id="navbuttons">
      <div id="navbuttonset1">
      <Button id="Lgbtn"
        onClick={() => navigate("../superadmin/usermanager")}
      >
        User Manager
      </Button>
      </div>
      <nav id="navbuttonset1">
      
      </nav>
      
      </div>
      
      </div>
      

    
    </div>
  );
};

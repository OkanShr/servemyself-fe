import "../../App.css"


import React from "react";
import { Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { useNavigate } from "react-router";
import { logout } from "../../store/authentication";

export const UserHomePage = () => {

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
    
    <div className="m-3" id="body">
      
      <div>
      <Button id="Lgbtn" onClick={logoutFunction}>Logout</Button>
      </div>
      <div id="form">
      
      <UserDetailsComponent id="profileheader" user={loginDetails.user} />
      <div id="navbuttons">
      <div id="navbuttonset1">
      <Button id="Lgbtn"
        onClick={() => navigate("../menu/scantablecode")}
      >
        Scan Menu
      </Button>
      
      </div>
      <nav id="navbuttonset1">
      <Button id="Lgbtn"
        onClick={() => navigate("../../user/history")}
      >
        My Order History
      </Button>
      </nav>
      
      </div>
      
      </div>
      

    
    </div>
  );
};

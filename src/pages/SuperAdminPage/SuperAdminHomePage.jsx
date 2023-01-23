import "../../App.css"


import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { Navigate, useNavigate ,Route} from "react-router";
import { login, logout } from "../../store/authentication";

export const SuperAdminHomePage = () => {



  const loginDetails = useSelector((state) => state.auth.value);
  const [showCreate, setShowCreate] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const logoutFunction = (e) => {  
    navigate("../login")
    logout();
  }



  return (
    
    <div className="m-3" id="body">
      
      <div>
      <Button id="btn" onClick={logoutFunction}>Logout</Button>
      </div>
      <div id="body">
      
      <h1>SuperAdmin My Menu</h1>
      
      <UserDetailsComponent id="profileheader" user={loginDetails.user} />
      <div id="navbuttons">
      <div id="navbuttonset1">
      <Button id="btn"
        onClick={() => navigate("../superadmin/usermanager")}
      >
        User Manager
      </Button>
      </div>
      <nav id="navbuttonset1">
      <Button id="btn"
        // onClick={() => navigate("")}
      >
        Empty Button
      </Button>
      </nav>
      
      </div>
      
      </div>
      

    
    </div>
  );
};

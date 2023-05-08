import '../../App.css'
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { logout } from "../../store/authentication";
import { useSelector,useDispatch } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";


export const AdminPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const logoutFunction = (e) => {  
    e.preventDefault();
    dispatch(
      //Reducer to initial state
      logout()
    );
    navigate("../login")
  }

  return (
    <div className="m-3" id='body'>
      <div>
      <Button id="Lgbtn" onClick={logoutFunction}>Logout</Button>
      <h1 className='mt-2'>Welcome Shop Owner</h1>
      <UserDetailsComponent user={loginDetails.user} />
      </div>
      

      <div id='navbuttons'>
          <div id="navbuttonset1">
          <Button id="Lgbtn"
            onClick={() => navigate("../admin/craftmenu")}
          >
            Craft Your Menu
          </Button>

          </div>

          <div id="navbuttonset1">

          <Button id="Lgbtn"
            onClick={() => navigate("../admin/ordermenu")}
          >
            See Orders
          </Button>

          </div>

          <div id="navbuttonset1">
          <Button id="Lgbtn"
            onClick={() => navigate("../admin/qrreader")}
          >
            Scan QR
          </Button>

          </div>

          <div id="navbuttonset1">

          <Button id="Lgbtn"
            onClick={() => navigate("../admin/qrgenerator")}
          >
            Generate QR
          </Button>

          </div>
          
          
      </div>{/* divbuttons */}

      
      
    </div>
  );
};


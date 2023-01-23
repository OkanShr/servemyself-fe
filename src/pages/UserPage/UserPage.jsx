import  '../../App.css'
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { Button } from "react-bootstrap";
import { MenuListComponent } from "../../components/TestAdminCraftComponent/MenuListComponent";

import { getMenu } from '../../api/menuApi';


export const UserPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();


  const logoutFunction = () => {  
    
  }
  useEffect(() => {
    updateItemList();
  },[])

  const [items, setItems] = useState([]);
  const[trayitems,setTrayItem]=useState([]);



  const updateItemList = () => {
    getMenu(loginDetails.token).then((response) =>{
      setItems(response.data);
      console.log(response.data);
    });
  };

  
  return (
    <div className="m-3" id='body'>
      <Button id="Lgbtn" onClick={() => navigate("../login")}>Logout</Button>
      <h1>UserPage</h1>
      
      <UserDetailsComponent user={loginDetails.user} />

      <MenuListComponent 
        updateItemList={updateItemList}
        items={items}
        trayitems={trayitems}
        setTrayItem={setTrayItem}
        loginDetails={loginDetails}
      />

      <div className="pt-3 float-end footer sticky-bottom navbar-fixed-bottom">
        <Button  onClick={() => navigate("../menu/waiterstray")}>Devam</Button>
      </div>
    </div>
  );
};

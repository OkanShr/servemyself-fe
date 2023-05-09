import React, { useEffect, useState} from "react";
import { Button, Form,Col} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import {MenuListComponent} from "../../components/TestAdminCraftComponent/MenuListComponent"
import { createOrder } from '../../api/orderApi';


export const MenuWaitersTray = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const page = "tray";
  let orderlist = ""
  let date = ""
  const tablecode = JSON.parse(localStorage.getItem('tablecode'));
  const [confirmed,setConfirmed] = useState(false)

  const [update,setUpdate] = useState(true);
  // const [showMakeOrder,setShowMakeOrder] = useState(false)
  const [trayitems, setTrayItem] = useState([]);
  const [orderinfo,setOrderInfo] = useState({
    username : "",
    orderlist : "",
    orderstatus : "",
    ordertable: tablecode,
    orderdate : ""
  });

  useEffect(() => {
    getTray();
    prepOrder();
  },[confirmed])

  useEffect(()=>{
    date = Date().toLocaleString()
    orderlist = JSON.stringify(trayitems)
    setOrderInfo({...orderinfo, username:loginDetails.user.username, orderlist:orderlist, orderstatus:"Pending", table:"", orderdate:date})
  },[update])

  let traydata = ""

  const getTray = (()=> {
    traydata = JSON.parse(localStorage.getItem('trayitems'));
    if(traydata) {
      console.log(traydata)
      setTrayItem(traydata);
    }
  });



  const prepOrder = () =>{
    setUpdate(!update)
  }
  const sendOrder = () =>{
    if(orderinfo.ordertable !== ""){
      console.log(orderinfo)
      createOrder(orderinfo,loginDetails.token)
      navigate("../menu/usermenu")
      window.alert('Order Successfull. You will get notified by the waiter soon. ',orderinfo.orderdate)
    }
    else{
      window.alert('You Have To Set Table Number First')
    }
    
  };
  function handleConfirm() {
    if(confirmed===false){
      return(
        <Button id="Lgbtn" className="m-2"  onClick={()=> setConfirmed(true)}>Confirm Order</Button>
      )
    }
    if(confirmed===true){
      return(
      <div>
        <Button id="Lgbtn" className="m-2" onClick={()=> setConfirmed(false)}>Make Changes</Button>
        <Button id="Lgbtn" onClick={()=> sendOrder()}>Make Order!</Button>
      </div>
        
      )
    }
  }

  return (
    <div className="m-3" id='body'>
      <Button id="Lgbtn" onClick={()=> navigate("../../home")}>Back To Menu</Button>
      <h1>Waiters Tray</h1>
      <UserDetailsComponent user={loginDetails.user} />

      <MenuListComponent
        items={trayitems}
        loginDetails={loginDetails}
        trayitems={trayitems}
        setTrayItem={setTrayItem}
        page={page}
        selectedcategory={''}
      />
      <p className="mt-2"> Table: {tablecode}</p>

      {handleConfirm()}
    </div>
  );
};

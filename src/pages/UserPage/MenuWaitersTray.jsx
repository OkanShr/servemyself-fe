import React, { useEffect, useState} from "react";
import { Button, Form,Col ,Row} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
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
  const [update,setUpdate] = useState(true);
  // const [showMakeOrder,setShowMakeOrder] = useState(false)
  const [trayitems, setTrayItem] = useState([]);
  const [orderinfo,setOrderInfo] = useState({
    username : "",
    orderlist : "",
    orderstatus : "",
    ordertable: "",
    orderdate : ""
  });

  useEffect(() => {
    getTray();
    prepOrder();
  },[])

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
      navigate("../../home")
      window.alert('Order Successfull. You will get notified by the waiter soon. ',orderinfo.orderdate)
    }
    else{
      window.alert('You Have To Set Table Number First')
    }
    
  };
  

  return (
    <div className="m-3" id='body'>
      <Button id="Lgbtn" onClick={()=> navigate("../../home")}>Back To Menu</Button>
      <h1>Waiters Tray</h1>
      <UserDetailsComponent user={loginDetails.user} />


        <Form id="tibform-group">
          <Form.Group controlId="formtable">
          <Form.Label id="formlabetable" column sm={2}>
            Table
          </Form.Label>
          <Col sm={10}>
            <Form.Control  onChange={(e) =>
              (setOrderInfo({ ...orderinfo, ordertable: e.target.value }),
              console.log(orderinfo))
            }
            type="text" 
            placeholder="Table Number"
            value={orderinfo.ordertable}
            />
          </Col>

          </Form.Group>
          
        </Form>
        {/* <Form.Group  id="tableinputbar" controlId="form.table">
          <Form.Label id="tablelabel">Table Number: </Form.Label>
          <Form.Control
            onChange={(e) =>
              (setOrder({ ...orderitems, ordertable: e.target.value }),
              console.log(orderitems))
            }
            value={orderitems.ordertable}
            placeholder="Table Number"
            required
          />
          <div>
          <Button variant="primary"  onClick={(e) =>
              (setOrder({ ...orderitems, ordertable: e.target.value }),setShowMakeOrder(e),
              console.log(orderitems))}>
            Submit
          </Button>
        </div>
        </Form.Group> */}
        

      
      <MenuListComponent
        items={trayitems}
        loginDetails={loginDetails}
        trayitems={trayitems}
        setTrayItem={setTrayItem}
        page={page}
        selectedcategory={''}
      />

      <Button id="Lgbtn" onClick={()=> sendOrder()}>Make Order!</Button>
    </div>
  );
};

import "../../App.css"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";

import React, { useEffect, useState } from "react";
import { OrderListComponent } from '../../components/AdminOrderComponents/OrderListComponent';
import { getOrders} from '../../api/orderApi.js'

export const AdminOrderMenu = () => {

  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);
  const [update,setUpdate] = useState(false)
  


  const [showSelf,setShowSelf] = useState({
    Ready:true,
    Pending:true,
    Preparing:true,
    Closed:true
  })
  
  const setReady =()=>{
    setShowSelf({...showSelf,"Ready":!showSelf.Ready},console.log(!showSelf.Ready))
    setUpdate(!update)
  }
  const setPending =()=>{
    setShowSelf({...showSelf,"Pending":!showSelf.Pending},console.log(!showSelf.Pending))
    setUpdate(!update)
  }
  const setPreparing =()=>{
    setShowSelf({...showSelf,"Preparing":!showSelf.Preparing},console.log(!showSelf.Preparing))
    setUpdate(!update)
  }
  const setClosed =()=>{
    setShowSelf({...showSelf,"Closed":!showSelf.Closed},console.log(!showSelf.Closed))
    setUpdate(!update)
  }
  const updateOrderList = () => {
    getOrders(loginDetails.token).then((response) => {
      setOrders(response.data);
      // console.log(response.data);
    });
  };
  useEffect(() => {
    updateOrderList();
    console.log("updated")
  },[update]);


  return (
    <div id='body'>
      <div>
      <Button id="Lgbtn" onClick={() => navigate("../home")}>Back To Main Menu</Button>
      <UserDetailsComponent user={loginDetails.user} />
      <h1>Orders</h1>
      
      <FormControlLabel
          defaultChecked={showSelf.Ready}
          checked={showSelf.Ready}
          value="Ready"
          control={<Checkbox onChange={()=>setReady()}/>}
          label="Ready"
          labelPlacement="start"
        />
      <FormControlLabel
          defaultChecked={showSelf.Pending}
          checked={showSelf.Pending}
          value="Pending"
          control={<Checkbox onChange={()=>setPending()}/>}
          label="Pending"
          labelPlacement="start"
      />
      <FormControlLabel
          defaultChecked={showSelf.Preparing}
          checked={showSelf.Preparing}
          value="Preparing"
          control={<Checkbox onChange={()=>setPreparing()}/>}
          label="Preparing"
          labelPlacement="start"

      />
      <FormControlLabel
          defaultChecked={showSelf.Closed}
          checked={showSelf.Closed}
          value="Closed"
          control={<Checkbox onChange={()=>setClosed()}/>}
          label="Closed"
          labelPlacement="start"
      />
      <OrderListComponent
        updateOrderList={updateOrderList}
        orders={orders}
        loginDetails={loginDetails}
        update={update}
        setUpdate={setUpdate}
        showSelf={showSelf}
        setShowSelf={setShowSelf}
      />
      
      </div>
      
    </div>

  );
};
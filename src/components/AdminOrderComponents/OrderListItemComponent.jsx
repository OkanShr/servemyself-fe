import React, { useState, forceUpdate} from "react";
import { updateOrder,deleteOrder } from "../../api/orderApi";
import {Button} from 'react-bootstrap';
import { useEffect } from 'react';
import { OrderPeekComponent } from "./OrderPeekComponent";



export const OrderListItemComponent = (props) => {
  const { loginDetails, update,setUpdate ,updateOrderList,showSelf} = props;
  const { username , ordertable , orderlist , id, ordertime,orderstatus} = props.item;
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [showPeek, setShowPeek] = useState(false);
  
  
  let parsedorderlist = JSON.parse(orderlist)

  useEffect(()=>{
    updateOrderList()
  },[update])

  const peekOrder= () => {
    setShowPeek(true)
    console.log(parsedorderlist)
  }

  const closePeek = () => {
    setShowPeek(false)
  }

  const acceptOrder = () => {
    props.item.orderstatus = "Preparing"
    updateOrder(props.item, loginDetails.token)
    console.log(props.item)
    setUpdate(!update)
  }

  const markReady = () => {
    props.item.orderstatus = "Ready"
    updateOrder(props.item, loginDetails.token)
    console.log(props.item)
    setUpdate(!update)
  }
  const closeOrder = () => {
    props.item.orderstatus = "Closed"
    updateOrder(props.item, loginDetails.token)
    console.log(props.item)
    setUpdate(!update)
  }
  const cancelOrder = () => {
    deleteOrder(props.item.id, loginDetails.token)
    setUpdate(!update)
  }
  
  function filterStatusButton(){
    if(orderstatus==="Pending"){
      return(
        <Button id="orderbutton" onClick={()=> acceptOrder()}>Accept Order</Button>
      )
    }
    if(orderstatus==="Preparing"){
      return(
        <Button id="orderbutton" onClick={()=> markReady()}>Mark Ready</Button>
      )
    }
    if(orderstatus==="Ready"){
      return(
        <Button id="orderbutton" onClick={()=> closeOrder()}>Close Order</Button>
      )
    }
    if(orderstatus==="Closed"){
      return(
        <Button id="orderbutton" onClick={()=> closeOrder}>Order Closed</Button>
      )
    }
  }
  function checkStatus(){
    if(props.item.orderstatus === "Ready"){
      return(showSelf.Ready)
    }
    if(props.item.orderstatus === "Preparing"){
      return(showSelf.Preparing)
    }
    if(props.item.orderstatus === "Closed"){
      return(showSelf.Closed)
    }
    if(props.item.orderstatus === "Pending"){
      return(showSelf.Pending)
    }
  }

  let statusValue = checkStatus()



  if(statusValue === true){
    
    return(
        <div id="order">
        <div id="orderheader">
          <p id="table">{ordertable}</p>
          <p id="status">{orderstatus}</p>
        </div>

        <div id="obl1">
          <Button id="orderbutton" onClick={()=> peekOrder()}>Peek Order</Button>
          {filterStatusButton()}
        </div>
        <div id="obl2">
          <Button id="orderbutton" onClick={()=> cancelOrder()}>Cancel Order</Button>
        </div>

        <OrderPeekComponent
        closePeek={closePeek}
        order={parsedorderlist}
        showPeek={showPeek}
        setShowPeek={setShowPeek}
        ordertime={ordertime}
        orderstatus={orderstatus}
        ordertable={ordertable}
        />


      </div>
    )
  }
  else{
    return("")
  }
  
    
  
  
  
};
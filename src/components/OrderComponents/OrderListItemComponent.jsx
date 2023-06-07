import React, { useState } from "react";
import { updateOrder, deleteOrder } from "../../api/orderApi";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { OrderPeekComponent } from "./OrderPeekComponent";

export const OrderListItemComponent = (props) => {
  const { loginDetails, update, setUpdate, updateOrderList, showSelf } = props;
  const { ordertable, orderlist, orderdate, orderstatus } =
    props.item;

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [showPeek, setShowPeek] = useState(false);

  let parsedorderlist = JSON.parse(orderlist);

  useEffect(() => {
    updateOrderList();
  }, [update]);

  const peekOrder = () => {
    setShowPeek(true);
  };

  const closePeek = () => {
    setShowPeek(false);
  };

  const acceptOrder = () => {
    props.item.orderstatus = "Preparing";
    updateOrder(props.item, loginDetails.token);
    setUpdate(!update);
  };

  const markReady = () => {
    props.item.orderstatus = "Ready";
    updateOrder(props.item, loginDetails.token);
    setUpdate(!update);
  };
  const closeOrder = () => {
    props.item.orderstatus = "Closed";
    updateOrder(props.item, loginDetails.token);
    setUpdate(!update);
  };
  const cancelOrder = () => {
    deleteOrder(props.item.id, loginDetails.token);
    setUpdate(!update);
  };

  function filterStatusButton() {
    if (loginDetails.user.role === "USER") {
      return null;
    }
    if (orderstatus === "Pending") {
      return (
        <Button id="orderbutton" onClick={() => acceptOrder()}>
          Accept Order
        </Button>
      );
    }
    if (orderstatus === "Preparing") {
      return (
        <Button id="orderbutton" onClick={() => markReady()}>
          Mark Ready
        </Button>
      );
    }
    if (orderstatus === "Ready") {
      return (
        <Button id="orderbutton" onClick={() => closeOrder()}>
          Close Order
        </Button>
      );
    }
    if (orderstatus === "Closed") {
      return (
        <Button id="orderbutton" onClick={() => closeOrder}>
          Order Closed
        </Button>
      );
    }
  }
  function cancelButton() {
    if (loginDetails.user.role === "ADMIN") {
      return (
        <div id="obl2">
          <Button id="orderbutton" onClick={() => cancelOrder()}>
            Cancel Order
          </Button>
        </div>
      );
    }
  }

  function checkStatus() {
    if (props.item.orderstatus === "Ready") {
      return showSelf.Ready;
    }
    if (props.item.orderstatus === "Preparing") {
      return showSelf.Preparing;
    }
    if (props.item.orderstatus === "Closed") {
      return showSelf.Closed;
    }
    if (props.item.orderstatus === "Pending") {
      return showSelf.Pending;
    }
  }

  let statusValue = checkStatus();

  if (statusValue === true) {
    return (
      <div id="order">
        <div id="orderheader">
          <p id="table">Table : {ordertable}</p>
          <p id="status">Order Status : {orderstatus}</p>
          <p id="status">
            Order Date : {orderdate.substring(0, orderdate.length - 21)}
          </p>
        </div>

        <div id="obl1">
          <Button id="orderbutton" onClick={() => peekOrder()}>
            Peek Order
          </Button>
          {filterStatusButton()}
        </div>

        {cancelButton()}

        <OrderPeekComponent
          closePeek={closePeek}
          order={parsedorderlist}
          showPeek={showPeek}
          setShowPeek={setShowPeek}
          orderdate={orderdate}
          ordertable={ordertable}
        />
      </div>
    );
  } else {
    return "";
  }
};

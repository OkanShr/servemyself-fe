import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getHistory } from "../../api/orderApi";
import { OrderListComponent } from "../../components/OrderComponents/OrderListComponent";

export const HistoryPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();

  const [showSelf, setShowSelf] = useState({
    Ready: true,
    Pending: true,
    Preparing: true,
    Closed: true,
  });

  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);

  const updateOrderList = () => {
    getHistory(loginDetails.user.username, loginDetails.token).then(
      (response) => {
        setOrders(response.data);
      }
    );
  };
  useEffect(() => {
    updateOrderList();
  }, [update]);

  return (
    <div id="body">
      <div id="banner">
      <Button id="Lgbtn" onClick={() => navigate("../../userhomepage")}>
        Back To Menu
      </Button>
      <h1 className="mt-2">
        Order History
      </h1>
      
      </div>
      

      <OrderListComponent
        updateOrderList={updateOrderList}
        orders={orders}
        loginDetails={loginDetails}
        update={update}
        setUpdate={setUpdate}
        showSelf={showSelf}
        setShowSelf={setShowSelf}
      />
      <div className="pt-3 float-end footer sticky-bottom navbar-fixed-bottom"></div>
    </div>
  );
};

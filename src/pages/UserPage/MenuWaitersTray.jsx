import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { MenuListComponent } from "../../components/MenuComponent/MenuListComponent";
import { createOrder } from "../../api/orderApi";

export const MenuWaitersTray = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const tablecode = JSON.parse(localStorage.getItem("tablecode"));

  const [confirmed, setConfirmed] = useState(false);
  const [trayitems, setTrayItem] = useState([]);
  const [update, setUpdate] = useState(true);

  const orderinfo = {
    username: loginDetails.user.username,
    orderlist: JSON.stringify(trayitems),
    orderstatus: "Pending",
    ordertable: tablecode,
    orderdate: new Date().toLocaleString(),
  };

  useEffect(() => {
    const traydata = JSON.parse(localStorage.getItem("trayitems"));
    if (traydata) {
      setTrayItem(traydata);
    }
  }, []);

  const getTray = () => {
    setUpdate(!update);
  };

  const sendOrder = () => {
    if (orderinfo.ordertable !== "") {
      createOrder(orderinfo, loginDetails.token);
      navigate("../menu/usermenu");
      window.alert(
        "Order Successful. You will get notified by the waiter soon. " +
          orderinfo.orderdate
      );
    } else {
      window.alert("Error.. Call Waiter");
    }
  };

  const handleConfirm = () => {
    if (!confirmed) {
      return (
        <Button id="Lgbtn" className="m-2" onClick={() => setConfirmed(true)}>
          Confirm Order
        </Button>
      );
    } else {
      return (
        <div>
          <Button
            id="Lgbtn"
            className="m-2"
            onClick={() => setConfirmed(false)}
          >
            Make Changes
          </Button>
          <Button id="Lgbtn" onClick={() => sendOrder()}>
            Send Order!
          </Button>
        </div>
      );
    }
  };

  return (
    <div id="body">
      <div id="banner">
        <Button id="Lgbtn" onClick={() => navigate("../menu/usermenu")}>
          Back To Menu
        </Button>
        <h1>Waiters Tray</h1>
      </div>
      <MenuListComponent
        updateItemList={getTray}
        confirmed={confirmed}
        items={trayitems}
        loginDetails={loginDetails}
        trayitems={trayitems}
        setTrayItem={setTrayItem}
        page="tray"
        selectedcategory=""
      />
      <p className="mt-2">Table: {tablecode.substring(tablecode.indexOf(":") + 1)}</p>
      {handleConfirm()}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { MenuListComponent } from "../../components/MenuComponent/MenuListComponent";
import { createOrder } from "../../api/orderApi";

export const MenuWaitersTray = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const page = "tray";
  let orderlist = "";
  let date = "";
  const tablecode = JSON.parse(localStorage.getItem("tablecode"));
  const [confirmed, setConfirmed] = useState(false);

  const [update, setUpdate] = useState(true);
  // const [showMakeOrder,setShowMakeOrder] = useState(false)
  const [trayitems, setTrayItem] = useState([]);
  const [orderinfo, setOrderInfo] = useState({
    username: "",
    orderlist: "",
    orderstatus: "",
    ordertable: tablecode,
    orderdate: "",
  });

  useEffect(() => {
    getTray();
    setUpdate(!update);
  }, [confirmed]);

  useEffect(() => {
    date = Date().toLocaleString();
    orderlist = JSON.stringify(trayitems);
    setOrderInfo({
      ...orderinfo,
      username: loginDetails.user.username,
      orderlist: orderlist,
      orderstatus: "Pending",
      table: "",
      orderdate: date,
    });
  }, [update]);

  let traydata = "";

  const getTray = () => {
    traydata = JSON.parse(localStorage.getItem("trayitems"));
    if (traydata) {
      setTrayItem(traydata);
    }
  };

  const sendOrder = () => {
    if (orderinfo.ordertable !== "") {
      createOrder(orderinfo, loginDetails.token);
      navigate("../menu/usermenu");
      window.alert(
        "Order Successfull. You will get notified by the waiter soon. ",
        orderinfo.orderdate
      );
    } else {
      window.alert("Error.. Call Waiter");
    }
  };
  function handleConfirm() {
    if (confirmed === false) {
      return (
        <Button id="Lgbtn" className="m-2" onClick={() => setConfirmed(true)}>
          Confirm Order
        </Button>
      );
    }
    if (confirmed === true) {

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
  }

  return (
    <div  id="body">
      
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
        page={page}
        selectedcategory={""}
      />
      <p className="mt-2">
        {" "}
        Table: {tablecode.substring(tablecode.indexOf(":") + 1)}
      </p>

      {handleConfirm()}
    </div>
  );
};

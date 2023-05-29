import React, { useEffect, useState} from "react";
import { Button, Form,Col} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { getHistory } from '../../api/menuApi';
import { OrderListComponent } from "../../components/AdminOrderComponents/OrderListComponent";

export const HistoryPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();


  const [showSelf,setShowSelf] = useState({
    Ready:true,
    Pending:true,
    Preparing:true,
    Closed:true
  })

  const[orders, setOrders] = useState([]);
  const [update,setUpdate] = useState(false)

  const updateOrderList = () => {
    getHistory(loginDetails.user.username,loginDetails.token).then((response) =>{
      setOrders(response.data);
      console.log(response.data);

    });
  };
  useEffect(() => {
    updateOrderList();
    console.log("updated")
  },[update]);

  return (
    <div className="m-3" id='body'>
      <Button id="Lgbtn" onClick={() => navigate("../../userhomepage")}>Back To Menu</Button>

      <UserDetailsComponent user={loginDetails.user} />
      
      <OrderListComponent
        updateOrderList={updateOrderList}
        orders={orders}
        loginDetails={loginDetails}
        update={update}
        setUpdate={setUpdate}
        showSelf={showSelf}
        setShowSelf={setShowSelf}
      />
      <div className="pt-3 float-end footer sticky-bottom navbar-fixed-bottom">
      </div>
    </div>
  );
};

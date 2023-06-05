import "../../App.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { red } from "@mui/material/colors";

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { OrderListComponent } from "../../components/OrderComponents/OrderListComponent";
import { getOrders } from "../../api/orderApi.js";

export const AdminOrderMenu = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [showSelf, setShowSelf] = useState({
    Ready: true,
    Pending: true,
    Preparing: true,
    Closed: true,
  });
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const updateOrderList = () => {
    getOrders(loginDetails.token).then((response) => {
      setOrders(response.data);
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      updateOrderList();
      console.log(interval)
    }, 3000);
    return () => clearInterval(interval);
  }, [update]);

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const setReady = () => {
    setShowSelf(
      { ...showSelf, Ready: !showSelf.Ready },
      console.log(!showSelf.Ready)
    );
    setUpdate(!update);
  };
  const setPending = () => {
    setShowSelf(
      { ...showSelf, Pending: !showSelf.Pending },
      console.log(!showSelf.Pending)
    );
    setUpdate(!update);
  };
  const setPreparing = () => {
    setShowSelf(
      { ...showSelf, Preparing: !showSelf.Preparing },
      console.log(!showSelf.Preparing)
    );
    setUpdate(!update);
  };
  const setClosed = () => {
    setShowSelf(
      { ...showSelf, Closed: !showSelf.Closed },
      console.log(!showSelf.Closed)
    );
    setUpdate(!update);
  };

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  return (
    <div id="body">
      <div>
        <div id="banner">
          <Button id="Lgbtn" onClick={() => navigate("../home")}>
            Back To Main Menu
          </Button>
          <h1 className="mt-2">
            Orders
          </h1>
        </div>

        <input
          id="searchtableinput"
          type="text"
          placeholder="Search Table"
          onChange={handleChangeSearch}
          value={searchInput}
        />
        <FormControlLabel
          id="container"
          defaultChecked={showSelf.Ready}
          checked={showSelf.Ready}
          value="Ready"
          control={
            <Checkbox
              sx={{
                color: red[900],
                "&.Mui-checked": {
                  color: red[900],
                },
              }}
              onChange={() => setReady()}
            />
          }
          label="Ready"
          labelPlacement="start"
        />
        <FormControlLabel
          defaultChecked={showSelf.Pending}
          checked={showSelf.Pending}
          value="Pending"
          control={
            <Checkbox
              sx={{
                color: red[900],
                "&.Mui-checked": {
                  color: red[900],
                },
              }}
              onChange={() => setPending()}
            />
          }
          label="Pending"
          labelPlacement="start"
        />
        <FormControlLabel
          defaultChecked={showSelf.Preparing}
          checked={showSelf.Preparing}
          value="Preparing"
          control={
            <Checkbox
              sx={{
                color: red[900],
                "&.Mui-checked": {
                  color: red[900],
                },
              }}
              onChange={() => setPreparing()}
            />
          }
          label="Preparing"
          labelPlacement="start"
        />
        <FormControlLabel
          defaultChecked={showSelf.Closed}
          checked={showSelf.Closed}
          value="Closed"
          control={
            <Checkbox
              sx={{
                color: red[900],
                "&.Mui-checked": {
                  color: red[900],
                },
              }}
              onChange={() => setClosed()}
            />
          }
          label="Closed"
          labelPlacement="start"
        />
        <OrderListComponent
          searchInput={searchInput}
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

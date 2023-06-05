import "../../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { MenuListComponent } from "../../components/MenuComponent/MenuListComponent";
import { getMenu } from "../../api/menuApi";
import { CategoryNavbar } from "../../components/MenuComponent/CategoryNavbar";
import { getCategory } from "../../api/menuApi";
import { logout } from "../../store/authentication";

export const UserPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const page = "viewmenu";
  const dispatch = useDispatch();

 
  useEffect(() => {
    updateItemList();
    updateCategoryList();
  }, []);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [trayitems, setTrayItem] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState("");
  const tablecode = JSON.parse(localStorage.getItem("tablecode"));

  const updateCategoryList = () => {
    getCategory(loginDetails.token).then((response) => {
      setCategories(response.data);
    });
  };

  const updateItemList = () => {
    getMenu(
      tablecode.substring(0, tablecode.indexOf(":")),
      loginDetails.token
    ).then((response) => {
      setItems(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log(selectedcategory);
  }, [selectedcategory]);

  return (
    <div id="body">
      <div id="banner">
      <Button id="Lgbtn" onClick={() => navigate("../../userhomepage")}>
          Back to Main Menu
        </Button>
        <h1 className="mt-3"> M E N U</h1>
        
      </div>
      <CategoryNavbar
        categories={categories}
        selectedcategory={selectedcategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MenuListComponent
        updateItemList={updateItemList}
        items={items}
        trayitems={trayitems}
        setTrayItem={setTrayItem}
        loginDetails={loginDetails}
        selectedcategory={selectedcategory}
        page={page}
        tablecode={tablecode}
      />
      <div className="pt-3 float-end footer sticky-bottom navbar-fixed-bottom" id="footercheckout">
        <Button id="Lgbtn" onClick={() => navigate("../menu/waiterstray")}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

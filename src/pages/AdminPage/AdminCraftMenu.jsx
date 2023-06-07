import "../../App.css";

import { Button } from "react-bootstrap";
import {  useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { MenuCraftComponent } from "../../components/MenuComponent/MenuCraftComponent";
import { MenuListComponent } from "../../components/MenuComponent/MenuListComponent";
import { CategoryAddComponent } from "../../components/MenuComponent/CategoryAddComponent";

import React, { useEffect, useState } from "react";
import { createItem, getMenu, getCategory } from "../../api/menuApi";

export const AdminCraftMenu = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const [showCraft, setShowCraft] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategory] = useState([]);
  const page = "craftmenu";

  const updateItemList = () => {
    getMenu(loginDetails.user.username, loginDetails.token).then((response) => {
      setItems(response.data);
    });
  };

  const updateCategoryList = () => {
    getCategory(loginDetails.token).then((response) => {
      setCategory(response.data);
    });
  };

  useEffect(() => {
    updateItemList();
    updateCategoryList();
  }, []);
  //create new item for the menu
  const create = (e, values) => {
    e.preventDefault();
    createItem(values, loginDetails.token)
      .then(() => {
        updateItemList();
        setShowCraft(false);
      })
      .catch((e) => {
        alert(e);
        setShowCraft(false);
      });
  };

  return (
    <div id="body">
      <div id="banner">
        <Button id="Lgbtn" onClick={() => navigate("../home")}>
          Back To Main Menu
        </Button>

        <h1>Craft Your Menu</h1>
      </div>

      <div id="addstuffdiv">
        <Button id="Lgbtn" onClick={() => setShowCraft(true)}>
          Add Item
        </Button>
        <Button
          id="Lgbtn"
          className="m-2"
          onClick={() => setShowAddCategory(true)}
        >
          Add Category
        </Button>
      </div>

      <MenuListComponent
        updateItemList={updateItemList}
        items={items}
        loginDetails={loginDetails}
        categories={categories}
        page={page}
      />

      {/* ITEM MANAGER POPUP */}
      <MenuCraftComponent
        create={create}
        loginDetails={loginDetails}
        showCraft={showCraft}
        setShowCraft={setShowCraft}
        categories={categories}
      />
      {/* CATEGORIES POPUP */}
      <CategoryAddComponent
        loginDetails={loginDetails}
        showAddCategory={showAddCategory}
        setShowAddCategory={setShowAddCategory}
        updateCategoryList={updateCategoryList}
        categories={categories}
      />
    </div>
  );
};

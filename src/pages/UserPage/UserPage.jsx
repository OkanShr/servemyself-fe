import  '../../App.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { Button } from "react-bootstrap";
import { MenuListComponent } from "../../components/TestAdminCraftComponent/MenuListComponent";
import { getMenu } from '../../api/menuApi';
import {CategoryNavbar} from '../../components/TestAdminCraftComponent/CategoryNavbar';
import { getCategory } from '../../api/menuApi';
import { logout } from "../../store/authentication";


export const UserPage = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const page = 'viewmenu';
  const dispatch = useDispatch();

  const logoutFunction = (e) => {  
    e.preventDefault();
    dispatch(
      //Reset Reducers to initial state.
      logout()
    );
    navigate("../login")
  }
  useEffect(() => {
    updateItemList();
    updateCategoryList();
  },[])

  const[categories,setCategories]=useState([]);
  const[items, setItems] = useState([]);
  const[trayitems,setTrayItem]=useState([]);
  const[selectedcategory,setSelectedCategory]= useState('');
  const tablecode = JSON.parse(localStorage.getItem('tablecode'));

  const updateCategoryList =()=>{
    getCategory(loginDetails.token).then((response)=>{
      setCategories(response.data);
    })
  }

  const updateItemList = () => {
    getMenu(tablecode.substring(0,tablecode.indexOf(":")),loginDetails.token).then((response) =>{
      setItems(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log(selectedcategory)
  },[selectedcategory])





  return (
    <div className="m-3" id='body'>
      <Button id="Lgbtn" onClick={logoutFunction}>Logout</Button>

      <UserDetailsComponent user={loginDetails.user} />
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
      <div className="pt-3 float-end footer sticky-bottom navbar-fixed-bottom">
        <Button id='Lgbtn'  onClick={() => navigate("../menu/waiterstray")}>Devam</Button>
      </div>
    </div>
  );
};

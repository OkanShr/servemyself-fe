import React,{useState} from "react";
import {Button} from "react-bootstrap"
import '../../App.css'
export const CategoryNavbar = (props) => {
  const {categories,setSelectedCategory,selectedcategory} = props
  
  

  return(
  <nav className="nav" id="CategoryNavbar">
    {categories?categories.map((x)=>(
      <Button key={x.id} onClick={()=>{setSelectedCategory(x.categoryname)}} id="CategoryNavButton">{x.categoryname}</Button>
    )):""}  
  </nav>
  )
}


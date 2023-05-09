
import React, { useState} from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { deleteItem, updateItem} from "../../api/menuApi";
import {MenuUpdateComponent} from "./MenuUpdateComponent"
import {Button,Card,Col,Form} from 'react-bootstrap';
import { useEffect } from 'react';


export const MenuListItemComponent = (props) => {
  const { loginDetails, updateItemList, trayitems,setTrayItem,page ,categories} = props;
  const {  name , description , price , id,image_url} = props.item;
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd,setShowAdd]= useState(true)
  const [update,setUpdate] = useState(true)
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  const save = (e, values) => {
    e.preventDefault();
    console.log(values);
    updateItem(values, loginDetails.token)
      .then(() => {
        setShowUpdate(false);
        updateItemList();
      })
      .catch((e) => {
        alert(e);
        setShowUpdate(false);
      });
  };

  const deleteItemf = () => {
    deleteItem(id, loginDetails.token).then(() => {
      updateItemList();
    });
  };

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
useEffect(() => {
  if(page==="tray"){
    setShowAdd(false);
  }
},[])

useEffect(() =>{
  window.localStorage.setItem('trayitems', JSON.stringify(trayitems));

},[trayitems,update])

  // >>>>>>>>>>>>>>>>>>>>>>>>Render Filters>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function filterQty(){
    if(page === "viewmenu" || page === "tray" ){
      if( showAdd===false ){
        return(
          <Card.Text>{!trayitems  ? price + "₺" : trayitems[trayitems.indexOf(props.item,0)].quantity * price + "₺"}</Card.Text>
        )
      }
      else{
        return(
          <Card.Text>{price + "₺"}</Card.Text>
        )
     
      }
    }
    else{
      return(
        <Card.Text>{price + "₺"}</Card.Text>
      )
    }
    
  }
    // if you're on tray page instead of description you will get to write a comment
    // for example take an ingredient out of the dish you want
  function swapCommentDescription(){
    if(page === "viewmenu" || page === "craftmenu")
    {
      return(
        <div className="w-100 pt-0 pb-1 px-1 d-flex flex-row justify-content-between ">
          <Card.Text  className='br-7px mb-0'>{description}</Card.Text>
          {filterButtons()}
        </div>
      )
    }
    if(page === "tray")
    {
      let index = trayitems.indexOf(props.item);
      return(
        <div className="w-100 pt-0 pb-1 px-1  ">
        {filterButtons()}
        <Form.Control id='itemdesc' onChange={(e) => (
          (trayitems[index].description = e.target.value),
          setUpdate(!update)
        )}
        type="text"
        >
        </Form.Control>
        </div>
        
      )
    }
    
  }

  function filterButtons (){
    if(loginDetails.user.role !== "ADMIN" ){
      if( showAdd===false){
        return(
        <div  id='qtydiv'>
          <button type='button' id='inc-dec'  onClick={() => handleDecrement(props.item)} className='input-group-text'>-</button>
          <div id='qtynum' className='form-control text-center'>{!trayitems  ? "" 
          :trayitems[trayitems.indexOf(props.item, 0)].quantity }</div>
          <button type='button' id='inc-dec' onClick={() => handleIncrement(props.item)} className='input-group-text'>+</button>
        </div>
        )
      }
      else{
        return(
          <Button onClick={handleAdd} className="align-self-end btn px-3 py-1" >Add</Button>
        )
      }
    }
    else{
      return(<div className='float-end d-flex flex-column'>
      <MdDelete onClick={deleteItemf} size={30} color="red" />
      <MdModeEditOutline 
      onClick={() => {
        setShowUpdate(true);
        console.log(props.item);
      }}
      size={30}
    />
    </div>)
    }
  }
  // >>>>>>>>>>>>>>>>>>>>>>Add-Inc-Dec>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function handleAdd(){
    setShowAdd(!showAdd)
    props.item.quantity = 1;
    setTrayItem(prevState => [...prevState, props.item]);
    console.log("Quantity of: ", props.item, " is ",props.item.quantity );
    console.log(trayitems);
  }

  const handleDecrement = (e) => {
    let index = trayitems.indexOf(e);
    trayitems[index].quantity = trayitems[index].quantity - 1
    if(trayitems[index].quantity < 1 && page =="tray"){
      trayitems[index].quantity = 0;
      trayitems.splice(index,1);
      localStorage.setItem('trayitems',JSON.stringify(trayitems))
      setUpdate(!update)
      window.location.reload();
    }
    if(trayitems[index].quantity < 1 && page!=="tray"){
      trayitems[index].quantity = 0;
      trayitems.splice(index,1);
      localStorage.setItem('trayitems',JSON.stringify(trayitems))
      setUpdate(!update)
      setShowAdd(true)
    }
    setUpdate(!update)
  }

  const handleIncrement = (e) => {
    let index = trayitems.indexOf(e);
    trayitems[index].quantity = trayitems[index].quantity + 1;
    setUpdate(!update)
  }
    
  function showImageUrl(){
    if(image_url){
      return ('/Images/'+ image_url)
    }
    else{
      return ('/Images/foodpicture.jpg')
    }
  }

    return (


      <div className="d-flex" id="listitemparent" >
        
        <Card className="flex-fill d-flex flex-row card-horizontal" id="listitem">
          <Card.Img
          variant='left'
          src={showImageUrl()}
          width='100px'
          height='120px'
          style={{objectFit:"contain"}}
          />
          <Col>
          <Card.Body className='d-flex flex-row align-items-baseline justify-content-between pt-1 px-1 pb-0'>
            <Card.Title>{name}</Card.Title>
            {filterQty()}
          </Card.Body>
          {swapCommentDescription()}
          

          </Col>


        </Card>
        {/* only for admin */}
        <MenuUpdateComponent
          save={save}
          item={props.item}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
          categories={categories}
        />
        
      </div>
    );
  
  
  
};

import React from 'react';
import {Button,ListGroup,Modal} from "react-bootstrap";
import { CategoryItemComponent } from './CategoryItemComponent';
import { createCategory } from '../../api/menuApi';

export const CategoryAddComponent = (props) => {
  const {  updateCategoryList,loginDetails,showAddCategory,setShowAddCategory,categories}=props;

  const handleClose = () => setShowAddCategory(false);
  const categoryvalue = {categoryname:"New Category"}

  const createNewCategory = () => {
    createCategory( categoryvalue ,loginDetails.token).then(()=>{
      updateCategoryList();
    })
 }
  

  return (
    <Modal
    show={showAddCategory}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
      <Modal.Title>Categories</Modal.Title>
    </Modal.Header>
    
     <ListGroup id='AddCategory' className='gap-1'>
     <Button id='Lgbtn' onClick={createNewCategory}>Add Category</Button>
      {
        categories?categories.slice(0).reverse().map((x)=>(
          <CategoryItemComponent key={x.id}
          category={x}
          loginDetails={loginDetails}
          updateCategoryList={updateCategoryList}
          />
        )):""
      }
     </ListGroup>
    </Modal>
  )
}
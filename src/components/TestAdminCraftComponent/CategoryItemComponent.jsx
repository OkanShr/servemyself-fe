import { useState,react } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MdModeEditOutline, MdDelete, MdDone ,MdClear } from "react-icons/md";
import { deleteCategory,updateCategory } from '../../api/menuApi';


export const CategoryItemComponent = (props) => {
  const {loginDetails, updateCategoryList} = props;
  const {categoryname, id }= props.category;
  const [edit,setEdit] = useState(false);
  const [values, setValues] = useState({
    id: id || 0,
    categoryname: categoryname
  });

  const changeEditState = () =>{
    setEdit(!edit);
  }
  const editCategory = () =>{
    updateCategory(values,loginDetails.token).then(()=>{
      updateCategoryList();
      setEdit(!edit);
      console.log(values);
    })
  }
  

  const deleteCategoryf = () => {
    deleteCategory(id, loginDetails.token).then(() => {
      updateCategoryList();
    })
  }
  function filterEdit(){
    if(edit===false){
      return(
        <div id='CategoryItem'>
          <p id='CategoryName'>{categoryname}</p>
          <MdModeEditOutline onClick={changeEditState} size={30} />
          <MdDelete onClick={deleteCategoryf} size={30} id="CategoryDeleteButton"  />
        </div>
      )
    }
    else{
      return(
        <div id='CategoryItem'>
          <Form.Control id='CategoryEditInput'
          onChange={(e) =>
            setValues({...values, categoryname: e.target.value })
          }
          value={values.categoryname}
          required
          placeholder='Category'
          />
          <MdDone onClick={editCategory} size={30} />
          <MdClear onClick={changeEditState} size={30} id="CategoryDeleteButton"  />
        </div>
      )
        
    }
  }


  return (
    <div>
      {filterEdit()}
    </div>

  )
}
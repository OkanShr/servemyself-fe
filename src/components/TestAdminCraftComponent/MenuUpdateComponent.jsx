import React, {useState} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

export const MenuUpdateComponent = (props) => {
  const { showUpdate, setShowUpdate ,categories} = props;
  const {id , name , description , price , category, image_url} = props.item;

  const [selectedimage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({
    id: id || 0,
    name: name || "",
    description: description || "",
    price: price || "",
    category: category || "",
    image_url: image_url || ""
  });

  const handleClose = () => {
    
    setShowUpdate(false)
    setSelectedImage(values.image_url)
  };

  const fileUploadHandler = (e) => {
    if(typeof(e) !== 'undefined'){
      if(e.type === "image/jpg" || e.type === "image/png" || e.type === "image/jpeg"){
        setSelectedImage(e);
        setValues({...values,image_url: (e.name)})
        
      }
      else{console.log("not an image")}
    }
    else{console.log("Image undefined")}
    
  };

  const onFileUpload = () => {
     
    // Create an object of formData
    const formData = new FormData();
   
    // Update the formData object
    formData.append(
      'file',
      selectedimage,
    );
   
    // Details of the uploaded file
    
    
    
    // Send formData object
    axios.post("http://localhost:3001/upload", formData,{})
      .then(res => { 
        console.log(res.statusText)
      })
  };


  function showSelectedImage (e){
    if(typeof(e) !== 'undefined' ){
      return(
        <img
        width={"250px"}
        src={URL.createObjectURL(e)}
      />
      )
    
    }
    else{
      return(
      <img
        width={"250px"}
        src={require('./foodpicture.jpg')}
      />
      )
      
    }
  }


return (
  <Modal
    show={showUpdate}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header>
      <Modal.Title>Add Item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={(e) => {props.save(e, values); onFileUpload()}}>
        <Form.Group size="lg" className="mb-3" controlId="form.name">
          <Form.Label size="lg">Item Name</Form.Label>
          <Form.Control
            onChange={(e) =>
              setValues({ ...values, name: e.target.value })
            }
            value={values.name}
            placeholder="Item Name"
            required
            size="lg"
            maxLength="25"
          />
        </Form.Group>

        <Form.Group controlId="form.description">
          <Form.Label size="lg">Item Description</Form.Label>
          <Form.Control
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            value={values.description}
            placeholder="Description"
            required
            size="lg"
            maxLength="120"
          />
        </Form.Group>

        <Form.Group controlId="form.iprice">
          <Form.Label size="lg">Item Price</Form.Label>
          <Form.Control
            onChange={(e) =>
              setValues({ ...values, price: e.target.value })
            }
            value={values.price}
            placeholder="Price"
            required
            size="lg"
            type="number"
            maxLength="6"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label size="lg">Item Category</Form.Label>
          <Form.Select
            required
            size="lg"
            value={values.category}
            onChange={(e) => setValues({...values,category: e.target.value })}
          >
            {categories?categories.map((x,idx)=>(
              <option key={idx} values={x}>
                {x.categoryname}
              </option>
            )):""}
          </Form.Select>
        </Form.Group>


        
        <Form.Group>
          
          <Form.Label size="lg">Item Image</Form.Label>
          {/* <img id="img" height={"150px"} src={require("./foodpicture.jpg")}  /> */}
          {selectedimage && (
        <div>
          {showSelectedImage(selectedimage)}
          <br />
          <Button variant="primary" className="mt-2 mb-2" onClick={() => setSelectedImage(null)}>Remove</Button>
        </div>
          )}
          <input
          placeholder=""
            type="file"
            name="itemImage"
            onChange={(event) => {
              fileUploadHandler(event.target.files[0])
              setSelectedImage(event.target.files[0])
            }}
          />
          
        </Form.Group>
        <div id="saveitem">
          <Button variant="primary" required type="submit" size="md" className="mt-2">
            Save
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);
};
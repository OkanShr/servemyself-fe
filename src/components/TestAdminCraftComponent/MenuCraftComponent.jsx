import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const MenuCraftComponent = (props) => {
  const { showCraft, setShowCraft, create,categories } = props;
  // const categories = ["Food" , "Drinks"];
  // categories.push("Desserts");
  


  // const [imageURLs, setImageURLs] = useState(initialState);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const handleClose = () => setShowCraft(false);

  return (
    <Modal
      show={showCraft}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => create(e, values)}>
          <Form.Group size="lg" className="mb-3" controlId="form.itemname">
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

          <Form.Group>
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

          <Form.Group>
            <Form.Label size="lg">Item Price</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues({ ...values, price: e.target.value })
              }
              value={values.price}
              placeholder="Price"
              required
              size="lg"
              maxLength="20"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label size="lg">Item Category</Form.Label>
            <Form.Select
            
            size="lg"
            value={values.category}
            onChange={(e) => setValues({...values,category: e.target.value })}
          >
            {categories.map((x,idx)=>(
              <option key={idx} values={x}>
                {x.categoryname}
              </option>
            ))}
          </Form.Select>
          </Form.Group>


          
          {/* CURRENTLY FILE UPLOAD IS DISABLED DUE TO RESTRICTION TO LOCAL FILES */}
          <Form.Group>
            <Form.Label size="lg">Select Picture</Form.Label>
            {/* <input type="file" id="img"  onChange={(e) => setValues({ ...values, pictureurl: e.target.value })}></input> */}
            {/* <img src={values.pictureurl}></img> */}
            <img id="img" height={"150px"} src={require("./foodpicture.jpg")}  />
            
          
          </Form.Group>
          
          
          <div id="saveitem">
            <Button variant="primary" required type="submit" size="md">
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
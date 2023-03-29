import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const MenuCraftComponent = (props) => {
  const { showCraft, setShowCraft, create,categories } = props;

  const [selectedimage, setSelectedImage] = useState(null);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: ""
  });

  const handleClose = () => {
    setShowCraft(false)
    setSelectedImage(null)
  };

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
          
          <Form.Label size="lg">Item Image</Form.Label>
          {/* <img id="img" height={"150px"} src={require("./foodpicture.jpg")}  /> */}
          {selectedimage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedimage)}
          />
          <br />
          <Button variant="primary" className="mt-2 mb-2" onClick={() => setSelectedImage(null)}>Remove</Button>
        </div>
          )}
          <input
          placeholder=""
            type="file"
            name="itemImage"
            onChange={(event) => {
              console.log(event.target.files[0].name);
              setSelectedImage(event.target.files[0]);
              setValues({...values,image_url: event.target.files[0].name})
              console.log(values)
            }}
          />
          
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
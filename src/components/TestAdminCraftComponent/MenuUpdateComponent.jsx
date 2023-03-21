import React, {useState} from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const MenuUpdateComponent = (props) => {
  const { showUpdate, setShowUpdate ,categories} = props;
  const {id , name , description , price , category} = props.item;


  const [values, setValues] = useState({
    id: id || 0,
    name: name || "",
    description: description || "",
    price: price || "",
    category: category || "",
    imageurl: ""
  });

  const handleClose = () => setShowUpdate(false);
return (
  <Modal
    show={showUpdate}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Add Item</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={(e) => props.save(e, values)}>
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
          {/* <Form.Label size="lg">Item Category</Form.Label>
          <Form.Control
            onChange={(e) =>
              setValues({ ...values, category: e.target.value })
            }
            value={values.category}
            placeholder="Category"
            size="lg"
            maxLength="20"
          /> */}
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
            Save
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);
};
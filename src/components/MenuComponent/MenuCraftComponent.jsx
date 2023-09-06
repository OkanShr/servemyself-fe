import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const timestamp = Date.now();
const date = new Date(timestamp).toISOString().split('T')[0];
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const MenuCraftComponent = (props) => {
  const { showCraft, setShowCraft, create, categories, loginDetails } = props;

  const [selectedimage, setSelectedImage] = useState(null);

  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "Asian",
    imageurl: "",
    restaurant: loginDetails.user.username,
  };

  const [values, setValues] = useState(initialState);

  const handleClose = () => {
    setShowCraft(false);
    setSelectedImage(null);
  };

  const fileUploadHandler = (e) => {
    if (typeof e !== "undefined") {
      if (
        e.type === "image/jpg" ||
        e.type === "image/png" ||
        e.type === "image/jpeg" ||
        e.type === "image/jfif"
      ) {
        setSelectedImage(e);
        setValues({ ...values, imageurl: `${date}-` + e.name });
      } else {
        console.log("Has to be jpg/png/jpeg/jfif");
      }
    } else {
      console.log("Image undefined");
    }
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedimage);

    try {
      axios.post("http://localhost:3010/upload", formData, {}).then((res) => {
        console.log(res.statusText);
      });
    } catch (e) {
      console.error(e);
    }

    // Send formData object
  };

  function showSelectedImage(e) {
    if (typeof e !== "undefined") {
      return <img alt="foodimg" width={"250px"} src={URL.createObjectURL(e)} />;
    } else {
      return <img alt="foodimg" width={"250px"} src={require("./foodpicture.jpg")} />;
    }
  }

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
        <Form
          onSubmit={(e) => {
            create(e, values);
            onFileUpload();
            setValues(initialState);
          }}
        >
          <Form.Group size="lg" className="mb-3" controlId="form.itemname">
            <Form.Label size="lg">Item Name</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, name: e.target.value })}
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
              onChange={(e) => setValues({ ...values, price: e.target.value })}
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
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            >
              {categories.map((x, idx) => (
                <option key={idx} values={x}>
                  {x.categoryname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label size="lg">Item Image</Form.Label>
            {selectedimage && (
              <div>
                {showSelectedImage(selectedimage)}
                <br />
                <Button
                  variant="primary"
                  className="mt-2 mb-2"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </Button>
              </div>
            )}
            <input
              placeholder=""
              type="file"
              name="itemImage"
              onChange={(event) => {
                fileUploadHandler(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </Form.Group>

          <div id="saveitem">
            <Button
              id="Lgbtn"
              className="mt-2"
              required
              type="submit"
              size="md"
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
// prints date & time in YYYY-MM-DD format used for uploading files
let today = year + "-" + month + "-" + date;
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const MenuUpdateComponent = (props) => {
  const { showUpdate, setShowUpdate, categories } = props;
  const { id, name, description, price, category, imageurl, restaurant } =
    props.item;

  const [selectedimage, setSelectedImage] = useState(null);
  const [values, setValues] = useState({
    id: id || 0,
    name: name || "",
    description: description || "",
    price: price || "",
    category: category || "",
    imageurl: imageurl || "",
    restaurant: restaurant,
  });

  const handleClose = () => {
    setShowUpdate(false);
    setSelectedImage(values.imageurl);
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
        setValues({ ...values, imageurl: today + "-" + e.name });
      } else {
        console.log("Has to be jpg/png/jpeg/jfif");
      }
    }
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedimage);

    try {
      axios
        .post("http://192.168.1.104:3001/upload", formData, {})
        .then((res) => {
          console.log(res.statusText);
        });
    } catch (e) {
      console.error(e);
    }

    // Send formData object
  };

  function showSelectedImage(e) {
    if (typeof e !== "undefined") {
      return <img width={"250px"} src={URL.createObjectURL(e)} />;
    } else {
      return <img width={"250px"} src={require("./foodpicture.jpg")} />;
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
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            props.save(e, values);
            onFileUpload();
          }}
        >
          <Form.Group size="lg" className="mb-3" controlId="form.name">
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
              onChange={(e) => setValues({ ...values, price: e.target.value })}
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
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            >
              {categories
                ? categories.map((x, idx) => (
                    <option key={idx} values={x}>
                      {x.categoryname}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label size="lg">Item Image</Form.Label>
            {/* <img id="img" height={"150px"} src={require("./foodpicture.jpg")}  /> */}
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
              variant="primary"
              required
              type="submit"
              size="md"
              className="mt-2"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

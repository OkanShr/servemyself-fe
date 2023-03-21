import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const UserUpdateComponent = (props) => {
  const { showUpdate, setShowUpdate } = props;
  const { id, username, name, surname, mail, role ,password} = props.user;

  const [values, setValues] = useState({
    id: id || 0,
    username: username || "",
    name: name || "",
    surname: surname || "",
    mail: mail || "",
    role: role || "",
    password: password
  });

  const handleClose = () => setShowUpdate(false);

  const roles = ["SUPER_ADMIN", "ADMIN", "USER" , "GUEST"];

  return (
    <Modal
      show={showUpdate}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => props.save(e, values)}>
          <Form.Group size="lg" className="mb-3" controlId="form.username">
            <Form.Label size="lg">username</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, username: e.target.value })}
              value={values.username}
              required
              size="lg"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" size="lg" controlId="form.email">
            <Form.Label size="lg">Email</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, mail: e.target.value })}
              value={values.mail}
              size="lg"
              type="text"
              placeholder="mail"
            />
          </Form.Group>
          <Form.Group className="mb-3" size="lg" controlId="form.name">
            <Form.Label size="lg">name</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              value={values.name}
              size="lg"
              type="text"
              placeholder="name"
            />
            <Form.Group className="mb-3" size="lg" controlId="form.surname">
              <Form.Label size="lg">surname</Form.Label>
              <Form.Control
                onChange={(e) => setValues({ ...values, surname: e.target.value })
                }
                value={values.surname}
                size="lg"
                type="text"
                placeholder="surname"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group size="lg" className="mb-3" controlId="form.role">
            <Form.Label size="lg">role</Form.Label>
            <Form.Select
              required
              size="lg"
              value={values.role}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            >
              {roles.map((x, idx) => (
                <option key={idx} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" required type="submit" size="md">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

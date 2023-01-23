import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const UserCreateComponent = (props) => {
  const { showCreate, setShowCreate, create } = props;
  const roles = ["ADMIN", "USER"];

  const [values, setValues] = useState({
    username: "",
    name: "",
    surname: "",
    mail: "",
    role: roles[0],
    password: "",
  });

  const handleClose = () => setShowCreate(false);

  return (
    <Modal
      show={showCreate}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => create(e, values)}>
          <Form.Group size="lg" className="mb-3" controlId="form.username">
            <Form.Label size="lg">Username</Form.Label>
            <Form.Control
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              value={values.username}
              placeholder="username"
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
              required
              size="lg"
              type="text"
              placeholder="mail"
            />
          </Form.Group>
          <Form.Group className="mb-3" size="lg" controlId="form.name">
            <Form.Label size="lg">Name</Form.Label>
            <Form.Control
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              value={values.name}
              size="lg"
              type="text"
              placeholder="name"
            />
            <Form.Group className="mb-3" size="lg" controlId="form.surname">
              <Form.Label size="lg">Surname</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, surname: e.target.value })
                }
                value={values.surname}
                size="lg"
                type="text"
                placeholder="surname"
              />
            </Form.Group>
            <Form.Group className="mb-3" size="lg" controlId="form.password">
              <Form.Label size="lg">Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                value={values.password}
                size="lg"
                type="password"
                required
                placeholder="password"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group size="lg" className="mb-3" controlId="form.role">
            <Form.Label size="lg">Role</Form.Label>
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

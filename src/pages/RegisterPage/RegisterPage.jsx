import "../../App.css";
import { BsChevronLeft } from "react-icons/bs";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { registerUser } from "../../api/authApi";

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    surname: "",
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const registerUserFunction = (e) => {
    e.preventDefault();
    registerUser(values)
      .then(() => alert("user registered"))
      .catch((e) => alert("Error: ", e.data))
      .finally(() => navigate("/login"));
  };

  return (
    <Container className="justify-content-center" id="body">
      <div id="banner">
        <BsChevronLeft
          onClick={() => navigate("../login")}
          id="back"
        ></BsChevronLeft>
        <h2 className="mt-3">Register</h2>
      </div>
      <Form onSubmit={(e) => registerUserFunction(e)}>
        <Form.Group size="lg" className="mb-3" controlId="form.username">
          <Form.Label id="formlabels" size="lg">
            Username
          </Form.Label>
          <Form.Control
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            value={values.username}
            placeholder="username"
            required
            size="lg"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="form.email">
          <Form.Label id="formlabels" size="lg">
            Email
          </Form.Label>
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
          <Form.Label id="formlabels" size="lg">
            Name
          </Form.Label>
          <Form.Control
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            //required
            value={values.name}
            size="lg"
            type="text"
            placeholder="name"
          />
          <Form.Group className="mb-3" size="lg" controlId="form.surname">
            <Form.Label id="formlabels" size="lg">
              Surname
            </Form.Label>
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
            <Form.Label id="formlabels" size="lg">
              Password
            </Form.Label>
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
        <div className="d-flex" id="Rgdiv">
          <Button required type="submit" id="Lgbtn">
            Register Me IM HUNGRY!!
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RegisterPage;

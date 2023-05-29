import  '../../App.css'

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Container } from "react-bootstrap";
import { loginUser } from "../../api/authApi";
import { login } from "../../store/authentication";
import { useNavigate } from "react-router";


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const loginFunction = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    loginUser(loginDetails)
      .then((x) => {
        setError("");
        const data = x.data;
        console.log(data);
        dispatch(
          login({
            token: data.accessToken,
            user: data.user,
          })
        );
        navigate("/home");
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setError(e.response.data.error);
      });
  };

  return (
    <Container className="d-flex flex-column justify-content-center" id='body'>
      <h2>
        <strong>SERVE MYSELF</strong>
      </h2>

      <br />
      <Form onSubmit={loginFunction}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="formlabels">Username</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, username: e.target.value })
            }
            type="text"
            required
            placeholder="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label id="formlabels">Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            required
            type="password"
            placeholder="password"
          />
        </Form.Group>
        <p className="font-weight-light text-danger">{error}</p>
        <div className="d-flex " id='Lgdiv'>
          <Button id="Lgbtn" variant="primary" required type="submit" size="md">
            Login
          </Button>
          
          
          
          
        </div>
        <p
          onClick={() => navigate("/password-reset")}
          style={{ cursor: "pointer" }} id='text'
        >
          Reset Password
        </p>
        <div id='notauser'>Not a User?</div>
          <Button id="Regbtn"
            onClick={() => navigate("/register")}
            variant="success"
            required
            type="submit"
            size="md"
          >
            Register
          </Button>
      </Form>
    </Container>

  );
};

export default LoginPage;

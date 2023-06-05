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
  const guestLogin = {
    username: "Guest",
    password: "Guest12345!"
  };

  const loginAsGuestFunction = (e) => {
    e.preventDefault();
    loginUser(guestLogin)
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
  }

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
      <h2 id='banner' className='pb-5 pt-5'>
        <strong>SERVE MYSELF</strong>
      </h2>

      <Form onSubmit={loginFunction}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label id="formlabels">Username</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, username: e.target.value })
            }
            type="text"
            
            placeholder="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label id="formlabels">Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            
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
        <p id='resetpwd'
          onClick={() => navigate("/password-reset")}
        >
          Reset Password
        </p>
        
        
        <div id='notauser'>Not a User?</div>
        <div id='row'>
        <Button id="Regbtn"
            onClick={() => navigate("/register")}
            required
            size="md"
          >
            Register
          </Button >
          <p id="or"><strong>
          OR
          </strong></p>
          <Button id="Regbtn"
            onClick={loginAsGuestFunction}
            required
            size="md"
          >
            Log As Guest
          </Button>
        </div>
        
        
        
      </Form>
    </Container>

  );
};

export default LoginPage;

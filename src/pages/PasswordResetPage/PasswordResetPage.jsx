import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { passwordReset, passwordResetRequest } from "../../api/userApi";

export const PasswordResetPage = () => {
  const [values, setValues] = useState({
    mail: "",
    password: "",
    emailSent: false,
    code: "",
    error: "",
  });

  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    if (values.emailSent == false) {
      passwordResetRequest({ mail: values.mail }).then(() => {
        setValues({ ...values, emailSent: true });
      });
    } else {
      passwordReset({
        mail: values.mail,
        password: values.password,
        code: parseInt(values.code),
      })
        .catch((e) => alert("Error: ", e.data))
        .finally(() => navigate("/login"));
    }
  };
  return (
    <Container className="mt-5">
      <h2 className="mt-5">Reset Your Password</h2>
      <Form className="mt-3" onSubmit={(e) => resetPassword(e)}>
        {!values.emailSent ? (
          <Container>
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
            <br />
            <Button variant="primary" required type="submit" id="Lgbtn">
              Send password reset request
            </Button>
          </Container>
        ) : (
          <Container>
            <Form.Group className="mb-3" size="lg" controlId="form.code">
              <Form.Label size="lg">Code</Form.Label>
              <Form.Control
                onChange={(e) => setValues({ ...values, code: e.target.value })}
                value={values.code}
                required
                size="lg"
                type="text"
                placeholder="code"
              />
            </Form.Group>
            <p className="font-weight-light text-primary">
              Reset Password Code Sent Your Mail!
            </p>
            <Form.Group>
              <Form.Label size="lg">New Password</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                value={values.password}
                required
                size="lg"
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <br />
            <Button variant="primary" required type="submit" size="md">
              Change my password
            </Button>
          </Container>
        )}
      </Form>
    </Container>
  );
};

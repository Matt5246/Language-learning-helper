// @ts-nocheck
import * as React from "react";
import { useState, useRef, FormEvent } from "react";
import {
  Form,
  Card,
  Button,
  Alert,
  Dropdown,
  DropdownButton,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PasswordStrength from "./PasswordStrength";
import { prefixOptions } from "../../config/options";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../features/user/userSlice";
import { signupRedux, signupState } from "../../features/user/signupSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [prefix, setPrefix] = useState<string>("+48");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const state = useSelector(signupState);
  const { loading } = state;
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    let phoneNum = prefix + (phoneRef?.current?.value ?? "");
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (passwordRef?.current?.value && passwordConfirmRef?.current?.value) {
      if (passwordRef?.current.value !== passwordConfirmRef?.current.value) {
        return setError("Passwords do not match!");
      }
      if (passwordRef?.current.value && passwordRef?.current.value.length < 8) {
        return setError("Password should be at least 8 characters long!");
      }
      if (!passwordRegex.test(passwordRef?.current.value)) {
        return setError(
          "Password should contain at least one lowercase letter, one uppercase letter, one number, one special character!"
        );
      }
    }
    if (phoneRef?.current?.value && phoneRef?.current.value.length !== 9) {
      return setError("Phone number should be 9 characters long! only numbers");
    }
    if (phoneRef?.current?.value === "") {
      phoneNum = "";
    }

    const formData = {
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
      passwordConfirm: passwordConfirmRef.current?.value ?? "",
      phone: phoneNum,
    };
    dispatch(setFormData(formData));
    const success = await dispatch(signupRedux(formData));
    if (success) {
      navigate("/account/signin");
    }
    setError(state.error);
  }

  React.useEffect(() => {
    setError(state.error);
  }, [state.error]);

  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && (
            <Alert variant="danger" className="alert alert-danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mt-1" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                value="43278Kr5102@"
              />
              {password !== "" ? (
                <PasswordStrength password={password} />
              ) : null}
            </Form.Group>
            <Form.Group className="mt-1 mb-1" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                placeholder="Confirm your password"
                value="43278Kr5102@"
              />
            </Form.Group>

            <Form.Group className="mt-1" id="phone">
              <Form.Label>Phone</Form.Label>
              <InputGroup>
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  menuVariant="dark"
                  title={prefix}
                  id="prefix-dropdown"
                >
                  {prefixOptions.map(option => (
                    <Dropdown.Item
                      key={option}
                      onClick={() => setPrefix(option)}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Form.Control
                  type="text"
                  ref={phoneRef}
                  minLength={9}
                  maxLength={9}
                  placeholder="Enter your phone number"
                />
              </InputGroup>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-3 button-text"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center">
          Already have an account?{" "}
          <Link className="link-style" to="/account/signin">
            Sign In
          </Link>
        </div>
      </Card>
    </>
  );
}

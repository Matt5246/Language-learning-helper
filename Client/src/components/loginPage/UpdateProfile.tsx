// @ts-ignore
import * as React from "react";
import {
  Form,
  Card,
  Button,
  Alert,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import PasswordStrength from "./PasswordStrength";
import { prefixOptions, passwordRegex } from "../../config/options";
import { useRef, useState } from "react";

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<string>("");
  const phoneRef = useRef<HTMLInputElement>(null);
  const { currentUser, updateMyEmail, updateMyPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [prefix, setPrefix] = useState<string>("+48");

  async function fetchData() {
    // try {
    //   const docRef = doc(db, "users", currentUser?.uid);
    //   const docSnap = await getDoc(docRef);
    //   const dataToUpdate = {};
    //   if (phoneRef?.current?.value) {
    //     dataToUpdate.phone = prefix + phoneRef?.current?.value;
    //   }
    //   if (docSnap.exists()) {
    //     await updateDoc(docRef, dataToUpdate);
    //   } else {
    //     await setDoc(docRef, dataToUpdate);
    //   }
    //   navigate("/");
    // } catch (e) {
    //   console.log(e);
    // }
    // setLoading(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (passwordRef?.current?.value && passwordConfirmRef?.current?.value) {
      if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
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
    if (phoneRef?.current?.value && phoneRef?.current?.value.length !== 9) {
      return setError("Phone number should be 9 characters long! only numbers");
    }

    const promises = [];
    setLoading(true);
    if (emailRef?.current && currentUser?.email !== emailRef?.current?.value) {
      promises.push(updateMyEmail(emailRef.current.value));
    }
    if (passwordRef?.current?.value) {
      promises.push(updateMyPassword(passwordRef?.current?.value));
    }
    if (phoneRef?.current?.value) {
      promises.push(fetchData());
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card className="card-style">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>

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
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={e => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
              {password !== "" ? (
                <PasswordStrength password={password} />
              ) : null}
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group className="mt-1" id="phone">
              <Form.Label>Phone</Form.Label>
              <InputGroup>
                <DropdownButton
                  // @ts-ignore
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
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
                  placeholder="Leave blank to keep the same"
                />
              </InputGroup>
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100 mt-3 button-text"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center">
          <Link className="link-style" to="/">
            Cancel
          </Link>
        </div>
      </Card>
    </>
  );
}

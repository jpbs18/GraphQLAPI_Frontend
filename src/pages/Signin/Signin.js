import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { gql, useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(credentials: { password: $password, email: $email }) {
      userErrors {
        message
      }
      token
    }
  }
`;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, { data, loading }] = useMutation(SIGN_IN);

  const handleClick = () => {
    signin({
      variables:{
        email,
        password
      }
    })
  };

  const [error, setError] = useState(null);
  
  useEffect(() => {
    if(data){
      if(data.signin.userErrors.length){
        setError(data.signin.userErrors[0].message);
      }

      if(data.signin.token){
        localStorage.setItem("token", data.signin.token)
      }
    }
  } ,[data])

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={() => handleClick()}>Signin</Button>
      </Form>
    </div>
  );
}

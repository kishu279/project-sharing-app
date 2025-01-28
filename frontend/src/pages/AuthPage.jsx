import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmssg, setErrmssg] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = response.data;
      if (response.status < 200 && response.status >= 300) {
        throw new Error(
          body.message || `HTTP error status: ${response.status}`
        );
      }
      setResponse(body.message);
    } catch (err) {
      console.log(err.response.data);
      setErrmssg(err.response.data || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (errmssg) {
    return <div>{errmssg}</div>;
  }

  if (response) {
    return <div>{response}</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={({ target: { value } }) => {
          setName(value);
        }}
        placeholder="Name ..."
        className="border"
      />
      <input
        type="email"
        value={email}
        onChange={({ target: { value } }) => {
          setEmail(value);
        }}
        placeholder="Email ..."
        className="border"
      />
      <input
        type="password"
        value={password}
        onChange={({ target: { value } }) => {
          setPassword(value);
        }}
        placeholder="Password ..."
        className="border"
      />
      <button onClick={handleClick}>submit</button>
    </div>
  );
}

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [errmssg, setErrmssg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  async function handleclick() {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const body = response.data;

      if (response.status < 200 && response.status >= 300) {
        throw new Error(
          body.message || `HTTP error status: ${response.status}`
        );
      }

      setResponse(body.message);  
      localStorage.setItem("auth-token", body.token);
      console.log(body.token);

      navigation("/dashboard");
    } catch (err) {
      setErrmssg(err.response.data.message || "An unexpected error occurred");
      return;
    } finally {
      setLoading(false);
    }
  }

  if (response) {
    return <div>{response}</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (errmssg) {
    return <div>{errmssg}</div>;
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={({ target: { value } }) => {
          setEmail(value);
        }}
        placeholder="email ..."
        className="border"
      />
      <input
        type="password"
        value={password}
        onChange={({ target: { value } }) => {
          setPassword(value);
        }}
        placeholder="password ..."
        className="border"
      />
      <button onClick={handleclick}>submit</button>
    </div>
  );
}

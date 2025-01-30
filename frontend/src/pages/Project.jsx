import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { projectPid } from "../state/selector";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import axios from "axios";

  export default function Project() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState("");
  const token = localStorage.getItem("auth-token");
  const fetched = useRecoilValueLoadable(projectPid({ token, queryParams }));
  const [inputValue, setInputValue] = useState("");
  const [res, setRes] = useState("");

  async function updateData() {
    try {
      const response = await axios.post(
        `http://localhost:3000/project/update?pid=${queryParams}`,
        {
          title: fetched.contents.title,
          description: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 300 && response.status < 200) {
        throw new Error(
          response.response.message ||
            `An HTTP error status: ${response.status}`
        );
      }

      setRes(response.data.message);
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {};

    for (let [key, value] of query.entries()) {
      params[key] = value;
    }

    setQueryParams(params["pid"]);
  }, [location.search]);

  useEffect(() => {
    setInputValue(fetched.contents.description);
  }, [fetched]);

  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <Logout />
      </div>
      <div>
        <div>{fetched.contents.name}</div>
        <div>{fetched.contents.title}</div>
        <textarea
          value={inputValue}
          placeholder="Description ..."
          className="border"
          onChange={({ target: { value } }) => {
            setInputValue(value);
          }}
        ></textarea>
        <button onClick={updateData}>Submit</button>
      </div>
      <div>{res}</div>
    </div>
  );
}

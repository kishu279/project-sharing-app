import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { projectPid } from "../state/selector";
import Logo from "../components/Logo";
import Logout from "../components/Logout";

export default function Project() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState("");
  const token = localStorage.getItem("auth-token");
  const [data, setData] = useRecoilStateLoadable(
    projectPid({ token, queryParams })
  );
  const [inputField, setInputField] = useState("");

  useEffect(() => {
    setInputField(data.contents.description);
  }, [data]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {};

    for (let [key, value] of query.entries()) {
      params[key] = value;
    }

    // console.log(params["pid"]);
    setQueryParams(params["pid"]);
  }, [location.search]);

  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <Logout />
      </div>
      <div>{data.contents.name}</div>
      <div>{data.contents.title}</div>
      <div>
        <textarea
          type="text"
          placeholder="description ..."
          value={inputField}
          onChange={({ target: { value } }) => {
            setInputField(value);
          }}
        />
        <button onClick={() => {}}>submit</button>
      </div>
    </div>
  );
}

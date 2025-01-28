import { Suspense, useEffect, useState } from "react";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { dataFetched } from "../state/selector";
import axios from "axios";
import { useNavigate } from "react-router";

function DataFetched({ token }) {
  const navigation = useNavigate();
  const datas = useRecoilValue(dataFetched(token));
  //

  return (
    <div className="mt-20">
      <div className="border h-[150px] flex overflow-x-scroll ">
        {datas &&
          datas.map((data) => (
            <div
              key={data.pid}
              className="border w-[350px] p-5 text-wrap flex-shrink-0"
              onClick={() => {
                navigation(`/project?pid=${data.pid}`);
              }}
            >
              {data.title}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const token = localStorage.getItem("auth-token");

  const [titleValue, setTitleValue] = useState("");
  const setDataTitleValue = useSetRecoilState(dataFetched(token));

  async function handleClick() {
    try {
      const response = await axios.post(
        "http://localhost:3000/project/create",
        {
          title: titleValue,
          description: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status < 200 && response.status >= 300) {
        console.error(response);
        return;
      }

      // console.log(response.data.pid);

      setDataTitleValue((prev) => [
        ...prev,
        { title: titleValue, description: "", pid: response.data.pid },
      ]);

      setTitleValue("");
    } catch (err) {
      console.error("Error: ", err.response.data);
      // setErrmssg(err.response.message);
    }
  }

  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <Logout />
      </div>

      <div>
        <input
          type="text"
          value={titleValue}
          onChange={({ target: { value } }) => {
            setTitleValue(value);
          }}
        />
        <button
          onClick={() => {
            handleClick();
          }}
        >
          confirm
        </button>
      </div>

      <div>
        <Suspense fallback={<div>Loading ...</div>}>
          <DataFetched token={token} />
        </Suspense>
      </div>
    </div>
  );
}

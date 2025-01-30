import { useLocation, useParams } from "react-router";
import Logo from "../components/Logo";
import Logout from "../components/Logout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Shareable() {
  const url = useParams();

  //   console.log(url.pid);
  const token = localStorage.getItem("auth-token");
  const [res, setRes] = useState(null);

  useEffect(() => {
    async function fetch() {
      console.log("fetchingstarted");
      const response = await axios.get(
        `http://localhost:3000/project/${url.pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status < 200 && response.status >= 300) {
        throw new Error(
          response.response.message || `An unknown error expected`
        );
      }

      console.log(response.data.data);
      setRes(response.data.data[0]);
    }

    fetch();
  }, []);

  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <Logout />
      </div>
      <div>Shareable</div>
      <div>
        <p>{res.title}</p>
        <p>{res.description}</p>
      </div>
    </div>
  );
}

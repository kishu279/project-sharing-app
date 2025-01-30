import { useLocation, useParams } from "react-router";
import Logo from "../components/Logo";
import Logout from "../components/Logout";

export default function Shareable() {
  const pid = useParams();

  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <Logout />
      </div>
      <div>Shareable</div>
    </div>
  );
}

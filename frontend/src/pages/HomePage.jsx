import { Outlet } from "react-router";
import Auth from "../components/Auth";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <div>
      <div className="border flex justify-between h-[50px]">
        <Logo />
        <div>
          <Auth />
        </div>
      </div>
      <div className="font-mono mt-20">
        <p className="text-3xl">Teamflow</p>
        <p className="">
          "Collaborate effortlessly—share your projects and ideas with ease on
          Teamflow."
        </p>
      </div>
      <Outlet />
    </div>
  );
}

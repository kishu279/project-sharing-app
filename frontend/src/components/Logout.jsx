import { useNavigate } from "react-router";

export default function Logout() {
  const navigation = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("auth-token");
          navigation("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

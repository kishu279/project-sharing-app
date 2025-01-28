import { useNavigate } from "react-router";

export default function Auth() {
  const navigation = useNavigate();
  return (
    <div className="display flex justify-between w-[120px]">
      <button
        onClick={() => {
          navigation("/signin");
        }}
      >
        Signin
      </button>
      <button
        onClick={() => {
          navigation("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
}

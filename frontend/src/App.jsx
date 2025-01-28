import { BrowserRouter, Route, Routes } from "react-router";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/HomePage";
import { Signin, Signup } from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route path="signup" element={<Signup />} />
              <Route path="signin" element={<Signin />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

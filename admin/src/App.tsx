import { Route, Routes } from "react-router";
import Home from "./pages/dashboard/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AuthLayout from "./layouts/auth-layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

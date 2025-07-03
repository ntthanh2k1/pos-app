import { Route, Routes } from "react-router";
import Home from "./pages/dashboard/home";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

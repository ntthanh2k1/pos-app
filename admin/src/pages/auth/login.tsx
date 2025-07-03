import { Button, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "@/components/form/password-input";
import { useState } from "react";
import TextInput from "@/components/form/text-input";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const nagivate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(loginForm);

    nagivate("/");
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="semibold" mb="3">
        Login
      </Text>

      <form onSubmit={handleLogin} className="w-full">
        <TextInput
          name="username"
          label="Username"
          required
          placeholder="Enter username"
          value={loginForm.username}
          onChange={handleChange}
        />

        <PasswordInput
          name="password"
          label="Password"
          required
          placeholder="Enter password"
          value={loginForm.password}
          onChange={handleChange}
        />

        <Button type="submit" w="full" mb="3">
          Login
        </Button>
      </form>

      <Flex w="full" textAlign="left">
        <Text>Don't have an account?&nbsp;</Text>
        <Link to="/register">
          <Text fontWeight="semibold">Register</Text>
        </Link>
      </Flex>
    </>
  );
};

export default Login;

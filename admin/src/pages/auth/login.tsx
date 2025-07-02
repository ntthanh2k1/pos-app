import {
  Button,
  Field,
  FieldRequiredIndicator,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "@/components/form/password-input";
import { useState } from "react";

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

    nagivate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <Text fontSize="2xl" fontWeight="semibold" mb="3">
        Login
      </Text>

      <Field.Root required mb="3">
        <Field.Label>
          Username <FieldRequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Enter username"
          value={loginForm.username}
          onChange={handleChange}
        />
      </Field.Root>

      <PasswordInput
        placeholder="Enter password"
        value={loginForm.password}
        onChange={handleChange}
      />

      <Button type="submit" w="full" mb="3">
        Login
      </Button>

      <Flex w="full" textAlign="left">
        Don't have an account?&nbsp;
        <Link to="/register">
          <Text fontWeight="semibold">Register</Text>
        </Link>
      </Flex>
    </form>
  );
};

export default Login;

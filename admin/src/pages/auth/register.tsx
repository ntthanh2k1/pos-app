import PasswordInput from "@/components/form/password-input";
import TextInput from "@/components/form/text-input";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(registerForm);

    navigate("/login");
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="semibold" mb="3">
        Register
      </Text>

      <form onSubmit={handleRegister} className="w-full">
        <TextInput
          name="name"
          label="Name"
          required
          placeholder="Enter name"
          value={registerForm.name}
          onChange={handleChange}
        />

        <TextInput
          name="username"
          label="Username"
          required
          placeholder="Enter username"
          value={registerForm.username}
          onChange={handleChange}
        />

        <PasswordInput
          name="password"
          label="Password"
          required
          placeholder="Enter password"
          value={registerForm.password}
          onChange={handleChange}
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          required
          placeholder="Enter confirm password"
          value={registerForm.confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit" w="full" mb="3">
          Register
        </Button>
      </form>

      <Flex w="full" textAlign="left">
        <Text>Already have an account?&nbsp;</Text>
        <Link to="/login">
          <Text fontWeight="semibold">Login</Text>
        </Link>
      </Flex>
    </>
  );
};

export default Register;

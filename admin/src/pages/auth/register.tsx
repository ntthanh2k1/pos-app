import PasswordInput from "@/components/form/password-input";
import {
  Button,
  Field,
  FieldRequiredIndicator,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Text fontSize="2xl" fontWeight="semibold" mb="3">
        Register
      </Text>

      <Field.Root required mb="3">
        <Field.Label>
          Name <FieldRequiredIndicator />
        </Field.Label>
        <Input placeholder="Enter name" />
      </Field.Root>

      <Field.Root required mb="3">
        <Field.Label>
          Username <FieldRequiredIndicator />
        </Field.Label>
        <Input placeholder="Enter username" />
      </Field.Root>

      <PasswordInput placeholder="Enter password" />

      <PasswordInput placeholder="Enter confirm password" />

      <Button w="full" mb="3">
        Register
      </Button>

      <Flex w="full" textAlign="left">
        Already have an account?&nbsp;
        <Link to="/login">
          <Text fontWeight="semibold">Login</Text>
        </Link>
      </Flex>
    </>
  );
};

export default Register;

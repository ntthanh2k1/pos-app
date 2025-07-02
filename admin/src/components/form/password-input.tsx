import {
  Field,
  FieldRequiredIndicator,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = ({ ...rest }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? IoEyeOff : IoEye;

  return (
    <Field.Root required mb="5">
      <Field.Label>
        Password <FieldRequiredIndicator />
      </Field.Label>
      <InputGroup
        endElement={
          <EyeIcon
            cursor="pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        }
      >
        <Input type={showPassword ? "text" : "password"} {...rest} />
      </InputGroup>
    </Field.Root>
  );
};

export default PasswordInput;

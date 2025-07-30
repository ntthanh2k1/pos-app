import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export default RegisterDto;

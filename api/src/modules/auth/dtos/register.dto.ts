import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export default RegisterDto;

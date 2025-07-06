import { IsNotEmpty, IsString } from "class-validator";

class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export default LoginDto;

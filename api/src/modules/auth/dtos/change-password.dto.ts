import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export default ChangePasswordDto;

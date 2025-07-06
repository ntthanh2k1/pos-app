import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}

export default ChangePasswordDto;

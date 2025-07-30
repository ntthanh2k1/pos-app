import { IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";
import RegisterDto from "../../auth/dtos/register.dto";

class CreateBusinessDto {
  // business
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  taxNumber: string;

  @IsOptional()
  address: string;

  @IsOptional()
  note: string;

  // user
  user: RegisterDto;
}

export default CreateBusinessDto;

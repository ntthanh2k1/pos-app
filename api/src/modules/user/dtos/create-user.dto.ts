import { IsNotEmpty, IsOptional } from "class-validator";

class CreateUserDto {
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  branchIds: string[];

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  identityNumber: string;

  @IsOptional()
  taxNumber: string;

  @IsOptional()
  gender: boolean;

  @IsOptional()
  birthDate: Date;

  @IsOptional()
  address: string;

  @IsOptional()
  note: string;
}

export default CreateUserDto;

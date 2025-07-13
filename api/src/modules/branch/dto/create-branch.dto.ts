import { IsNotEmpty, IsOptional } from "class-validator";

class CreateBranchDto {
  @IsNotEmpty()
  name: string;

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
}

export default CreateBranchDto;

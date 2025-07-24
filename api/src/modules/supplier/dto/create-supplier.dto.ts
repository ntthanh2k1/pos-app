import { IsNotEmpty, IsOptional } from "class-validator";

class CreateSupplierDto {
  @IsNotEmpty()
  businessId: string;

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

export default CreateSupplierDto;

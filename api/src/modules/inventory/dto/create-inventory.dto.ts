import { IsNotEmpty, IsOptional } from "class-validator";

class CreateInventoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  address: string;

  @IsOptional()
  note: string;
}

export default CreateInventoryDto;

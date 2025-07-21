import { IsNotEmpty, IsOptional } from "class-validator";

class CreateInventoryDto {
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  note: string;
}

export default CreateInventoryDto;

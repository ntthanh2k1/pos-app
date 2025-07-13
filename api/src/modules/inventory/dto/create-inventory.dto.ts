import { IsNotEmpty, IsOptional } from "class-validator";

class CreateInventoryDto {
  @IsNotEmpty()
  branchId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  note: string;
}

export default CreateInventoryDto;

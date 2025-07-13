import { IsNotEmpty, IsOptional } from "class-validator";

class CreateInventoryDto {
  @IsNotEmpty()
  branch_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  note: string;
}

export default CreateInventoryDto;

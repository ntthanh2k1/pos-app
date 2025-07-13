import { IsNotEmpty, IsOptional } from "class-validator";

class CreateItemDto {
  @IsOptional()
  categoryItemId: string;

  @IsOptional()
  unitId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  cost: number;

  @IsOptional()
  note: string;
}

export default CreateItemDto;

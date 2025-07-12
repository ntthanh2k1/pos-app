import { IsNotEmpty, IsOptional } from "class-validator";

class CreateItemDto {
  @IsOptional()
  category_item_id: string;

  @IsOptional()
  unit_id: string;

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

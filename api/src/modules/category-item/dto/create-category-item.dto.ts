import { IsNotEmpty, IsOptional } from "class-validator";

class createCategoryItemDto {
  @IsOptional()
  parent_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  note: string;
}

export default createCategoryItemDto;

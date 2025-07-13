import { IsNotEmpty, IsOptional } from "class-validator";

class createCategoryItemDto {
  @IsOptional()
  parentId: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  note: string;
}

export default createCategoryItemDto;

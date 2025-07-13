import { IsOptional } from "class-validator";
import createCategoryItemDto from "./create-category-item.dto";

class updateCategoryItemDto extends createCategoryItemDto {
  @IsOptional()
  isActive: boolean;
}

export default updateCategoryItemDto;

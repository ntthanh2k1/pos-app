import { IsOptional } from "class-validator";
import CreateItemDto from "./create-item.dto";

class UpdateItemDto extends CreateItemDto {
  @IsOptional()
  isActive: boolean;
}

export default UpdateItemDto;

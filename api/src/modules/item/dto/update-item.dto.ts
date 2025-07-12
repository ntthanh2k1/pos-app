import { IsOptional } from "class-validator";
import CreateItemDto from "./create-item.dto";

class UpdateItemDto extends CreateItemDto {
  @IsOptional()
  is_active: boolean;
}

export default UpdateItemDto;

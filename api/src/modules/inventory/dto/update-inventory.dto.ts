import { IsOptional } from "class-validator";
import CreateInventoryDto from "./create-inventory.dto";

class UpdateInventoryDto extends CreateInventoryDto {
  @IsOptional()
  is_active: boolean;
}

export default UpdateInventoryDto;

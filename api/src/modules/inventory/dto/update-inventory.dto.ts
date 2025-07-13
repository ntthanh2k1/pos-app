import { IsOptional } from "class-validator";
import CreateInventoryDto from "./create-inventory.dto";

class UpdateInventoryDto extends CreateInventoryDto {
  @IsOptional()
  isActive: boolean;
}

export default UpdateInventoryDto;

import { IsOptional } from "class-validator";
import CreateUnitDto from "./create-unit.dto";

class UpdateUnitDto extends CreateUnitDto {
  @IsOptional()
  is_active: boolean;
}

export default UpdateUnitDto;

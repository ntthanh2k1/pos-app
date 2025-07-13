import { IsOptional } from "class-validator";
import CreateUnitDto from "./create-unit.dto";

class UpdateUnitDto extends CreateUnitDto {
  @IsOptional()
  isActive: boolean;
}

export default UpdateUnitDto;

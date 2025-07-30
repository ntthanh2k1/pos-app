import { IsOptional } from "class-validator";
import CreateBusinessDto from "./create-business.dto";

class UpdateBusinessDto extends CreateBusinessDto {
  @IsOptional()
  is_active: boolean;
}

export default UpdateBusinessDto;

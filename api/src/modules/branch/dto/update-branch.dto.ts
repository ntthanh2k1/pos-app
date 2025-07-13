import { IsOptional } from "class-validator";
import CreateBranchDto from "./create-branch.dto";

class UpdateBranchDto extends CreateBranchDto {
  @IsOptional()
  isActive: boolean;
}

export default UpdateBranchDto;

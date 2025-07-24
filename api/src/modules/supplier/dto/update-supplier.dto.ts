import { IsOptional } from "class-validator";
import CreateSupplierDto from "./create-supplier.dto";

class UpdateSupplierDto extends CreateSupplierDto {
  @IsOptional()
  isActive: boolean;
}

export default UpdateSupplierDto;

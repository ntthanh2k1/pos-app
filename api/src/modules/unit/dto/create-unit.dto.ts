import { IsNotEmpty, IsOptional } from "class-validator";

class CreateUnitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;

  @IsOptional()
  note: string;
}

export default CreateUnitDto;

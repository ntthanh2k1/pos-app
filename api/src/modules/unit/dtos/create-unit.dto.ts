import { IsNotEmpty, IsString } from "class-validator";

class CreateUnitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsString()
  note: string;
}

export default CreateUnitDto;

import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllUnitsDto {
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  searchColumns: string[];

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  @IsString()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default GetAllUnitsDto;

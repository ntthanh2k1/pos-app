import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

class GetAllUnitsDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  searchColumns: string[];

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default GetAllUnitsDto;

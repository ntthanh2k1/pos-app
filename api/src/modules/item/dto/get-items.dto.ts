import { IsEnum, IsOptional } from "class-validator";

class GetItemsDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  searchColumns: string[];

  @IsOptional()
  categoryItemId: string;

  @IsOptional()
  unitId: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default GetItemsDto;

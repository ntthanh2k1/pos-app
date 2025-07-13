import { IsEnum, IsOptional } from "class-validator";

class GetInventoriesDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  searchColumns: string[];

  @IsOptional()
  branch_id: string;

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default GetInventoriesDto;

import { IsEnum, IsOptional } from "class-validator";

class getCategoryItemsDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  searchColumns: string[];

  @IsOptional()
  parentId: string;

  @IsOptional()
  businessId: string;

  @IsOptional()
  branchId: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default getCategoryItemsDto;

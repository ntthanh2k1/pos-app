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
  category_item_id: string;

  @IsOptional()
  unit_id: string;

  @IsOptional()
  is_active: boolean;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  orderDir: "ASC" | "DESC";
}

export default GetItemsDto;

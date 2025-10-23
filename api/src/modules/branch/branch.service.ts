import branchInventoryRepository from "../../repositories/branch-inventory.repository";
import branchRepository from "../../repositories/branch.repository";
import inventoryRepository from "../../repositories/inventory.repository";
import createCode from "../../shared/utils/create-code";
import CreateBranchDto from "./dto/create-branch.dto";

const createBranch = async (
  createBranchDto: CreateBranchDto,
  authUser: any
) => {
  const { name, phone, email, taxNumber, address, note } = createBranchDto;

  // create branch
  const code = createCode("BH");
  const newBranch = await branchRepository.create({
    business_id: authUser.businessId,
    code,
    name,
    phone,
    email,
    tax_number: taxNumber,
    address,
    note,
    created_by: authUser.userId,
  });

  // create inventory
  const inventoryCode = createCode("IY");
  const newInventory = await inventoryRepository.create({
    business_id: authUser.businessId,
    code: inventoryCode,
    name: `${name}'s Main Inventory`,
    is_main_inventory: true,
    created_by: authUser.userId,
  });

  // create branch-inventory
  await branchInventoryRepository.create({
    inventory_id: newInventory.inventory_id,
    branch_id: newBranch.branch_id,
    business_id: authUser.businessId,
    created_by: authUser.userId,
  });

  return {
    message: "Create branch successfully.",
    data: newBranch,
  };
};

const branchService = {
  createBranch,
};

export default branchService;

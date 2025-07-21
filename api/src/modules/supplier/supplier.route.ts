import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import CreateSupplierDto from "./dto/create-supplier.dto";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "./supplier.controller";
import GetSuppliersDto from "./dto/get-suppliers.dto";
import UpdateSupplierDto from "./dto/update-supplier.dto";

const router = express.Router();

router.use(authorize);

router.post("/", validateDto(CreateSupplierDto), createSupplier);
router.get("/", validateDto(GetSuppliersDto, "query"), getSuppliers);
router.get("/:id", getSupplier);
router.patch("/:id", validateDto(UpdateSupplierDto), updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;

import express from "express";
import { addProductController, deleteProductByIdController, getProductByIdController, getProductController, updateAllFieldsController, updateProductQuantityController} from "./production.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { verifyRoles } from "../../middlewares/verifyRoles.middleware";

const productRouter = express.Router();

productRouter.get("/", verifyToken, verifyRoles("admin", "manager"), getProductController);
productRouter.get("/:id", verifyToken, verifyRoles("admin", "manager"), getProductByIdController);
productRouter.patch("/:id", verifyToken, verifyRoles("admin", "manager"), updateProductQuantityController);
productRouter.put("/:id", verifyToken, verifyRoles("admin", "manager"), updateAllFieldsController);
productRouter.delete("/:id", verifyToken, verifyRoles("admin", "manager"), deleteProductByIdController);
productRouter.post("/", verifyToken, verifyRoles("admin", "manager"), addProductController);

export default productRouter;

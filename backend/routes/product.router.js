import express from "express";

import {
  getProducts,
  getProdcutById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  addUserReview,
  bulkInsertProducts,
  getAdminStats,
} from "../controller/product.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/bulk", checkAuth, checkAdmin, bulkInsertProducts);

// // New method.
router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.get("/topproducts", getTopProducts);
router.get("/stats", checkAuth, checkAdmin, getAdminStats);
router
  .route("/:id")
  .get(getProdcutById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);

// // Old method
// router.get("/allproducts", getProducts);
// router.get("/productbyid/:id", getProdcutById);
// router.post("/addnewproduct", checkAuth, checkAdmin, addProduct);
// router.put("/updateproduct/:id", checkAuth, checkAdmin, updateProduct);
// router.delete("/deleteProduct/:id", checkAuth, checkAdmin, deleteProduct);
// router.get("/topproducts/:limit", getTopProducts);
router.put("/:id/addreview", checkAuth, addUserReview);

export default router;

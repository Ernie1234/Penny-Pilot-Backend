import { Router } from "express";

import {
  createTransaction,
  getTransactions,
} from "../controllers/transactions";

const router = Router();

// Protected routes
router.post("/", createTransaction);
router.get("/:userId", getTransactions);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_1 = require("../controllers/transactions");
const router = (0, express_1.Router)();
// Protected routes
router.post("/", transactions_1.createTransaction);
router.get("/:userId", transactions_1.getTransactions);
exports.default = router;

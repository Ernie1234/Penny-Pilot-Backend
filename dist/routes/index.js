"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = __importDefault(require("./transaction"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/transaction", transaction_1.default);
exports.default = apiRouter;

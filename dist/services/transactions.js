"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactions = exports.getUserTransactions = exports.createTransaction = void 0;
const transaction_1 = __importDefault(require("../models/transaction"));
// Create new transaction
const createTransaction = (transactionData) => __awaiter(void 0, void 0, void 0, function* () {
    return transaction_1.default.create(transactionData);
});
exports.createTransaction = createTransaction;
// Get transactions for specific user
const getUserTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return transaction_1.default.find({ userId }).sort({ date: -1 });
});
exports.getUserTransactions = getUserTransactions;
// Admin function to get all transactions
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    return transaction_1.default.find().sort({ date: -1 });
});
exports.getAllTransactions = getAllTransactions;

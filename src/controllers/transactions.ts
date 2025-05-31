// src/controllers/transactions.ts
import { Request, Response } from "express";
import * as TransactionService from "../services/transactions";

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const transaction = await TransactionService.createTransaction({
      userId,
      ...req.body,
    });
    return res.status(201).json(transaction);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    const transactions = await TransactionService.getUserTransactions(userId);
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

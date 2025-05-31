import Transaction from "../models/transaction";

// Create new transaction
export const createTransaction = async (transactionData: {
  title: string;
  userId: string;
  amount: number;
  description: string;
  category: string;
}) => {
  return Transaction.create(transactionData);
};

// Get transactions for specific user
export const getUserTransactions = async (userId: string) => {
  return Transaction.find({ userId });
};

// Admin function to get all transactions
export const getAllTransactions = async () => {
  return Transaction.find().sort({ date: -1 });
};

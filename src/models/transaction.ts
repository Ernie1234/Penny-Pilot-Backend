import mongoose, { Document, Schema } from "mongoose";

interface ITransaction extends Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);

import mongoose, { Document, Schema } from "mongoose";

interface ITransaction extends Document {
  userId: string;
  amount: number;
  description: string;
  category: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
    toJSON: {
      transform: (doc, ret) => {
        const transformedRet = { ...ret };
        transformedRet.id = transformedRet._id; // Include id field
        delete transformedRet._id; // Remove _id field
        delete transformedRet.__v; // Remove version key
        return transformedRet;
      },
    },
  }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);

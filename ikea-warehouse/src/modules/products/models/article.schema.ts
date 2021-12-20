import { Schema } from 'mongoose';

export interface ArticleEntity extends Document {
  name: string;
  stock: number;
  art_id: number;
}

export const ArticleSchema = new Schema<ArticleEntity>(
  {
    name: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0
    },
    art_id: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  },
);

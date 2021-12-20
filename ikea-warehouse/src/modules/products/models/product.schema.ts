import { Schema, ObjectId } from 'mongoose';

const {
  Types,
} = Schema;

export interface ProductEntity extends Document {
  name: string
  articles: ObjectId[]
}

export const ProductSchema = new Schema<ProductEntity>(
  {
    name: {
      type: String,
      default: '',
    },
    articles: [{
      type: Types.ObjectId,
      ref: 'Article',
    }]
  },
  {
    timestamps: true,
  },
);

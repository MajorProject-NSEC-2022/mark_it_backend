import { Schema, Types } from 'mongoose';

export class Blog {
  _id: Types.ObjectId;
  title: string;
  data: string;
  tags: string[];
  likesNum: number;
  likes: Types.ObjectId[];
  dislikesNum: number;
  dislikes: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

export const BlogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide title'],
    },
    data: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      trim: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true },
);

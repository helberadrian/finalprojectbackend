import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Cart", cartSchema);
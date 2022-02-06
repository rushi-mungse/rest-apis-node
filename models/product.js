import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

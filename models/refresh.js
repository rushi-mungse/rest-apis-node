import mongoose from "mongoose";
const Schema = mongoose.Schema;

const refreshSchema = new Schema(
  {
    refreshToken: { type: String, required: true, unique: true },
  },
  { timestamps: false }
);

export default mongoose.model("RefreshToken", refreshSchema);

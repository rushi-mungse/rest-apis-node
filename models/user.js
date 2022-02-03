import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: string, required: true },
    email: { type: string, required: true, unique: true },
    password: { type: string, require: true },
    repeat_password: { type: Schema.Types.ObjectId, ref: "password" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

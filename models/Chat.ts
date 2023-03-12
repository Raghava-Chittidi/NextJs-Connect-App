import mongoose from "mongoose";

const Schema = mongoose.Schema;
const chatSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);

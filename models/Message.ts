import mongoose from "mongoose";

const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);

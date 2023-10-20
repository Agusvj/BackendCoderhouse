import { Schema, model } from "mongoose";
import crypto from "crypto";

const TicketSchema = new Schema(
  {
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    code: {
      type: String,
      required: true,
      default: " ",
    },
  },
  { timestamps: true }
);

TicketSchema.pre("save", async function () {
  const TicketModel = model("tickets");

  let newCode;
  let count;

  do {
    newCode = crypto.randomBytes(12).toString("hex");
    count = await TicketModel.countDocuments({ code: newCode });
  } while (count > 0);

  this.code = newCode;
});

const TicketModel = model("tickets", TicketSchema);

export default TicketModel;

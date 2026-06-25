import mongoose from "mongoose";

const demandSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional, depending on if user is logged in
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "reviewed", "fulfilled", "rejected"],
    },
  },
  { timestamps: true }
);

const Demand = mongoose.model("Demand", demandSchema);
export default Demand;

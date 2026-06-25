import Demand from "../models/demand.model.js";

export const getDemands = async (req, res) => {
  try {
    const demands = await Demand.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(demands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch demands" });
  }
};

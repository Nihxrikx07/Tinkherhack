const router = require("express").Router();
const Food = require("../models/Food");
const auth = require("../middleware/authMiddleware");

// Add food (Hotel only)
router.post("/add", auth, async (req, res) => {
  if (req.user.role !== "hotel")
    return res.status(403).json({ message: "Only hotels allowed" });

  const { name, price, expiry } = req.body;

  const food = new Food({
    name,
    price,
    expiry,
    hotel: req.user.id
  });

  await food.save();
  res.json({ message: "Food added" });
});

// Get all food
router.get("/", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

module.exports = router;
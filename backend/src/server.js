const express = require("express");
const cors = require("cors");
const { calculateBestValue } = require("./calculator/calculate");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  try {
    const { options } = req.body;

    if (!options) {
      return res.status(400).json({
        error: "options field is required",
      });
    }

    const results = calculateBestValue(options);

    res.json({
      results,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Best Value Calculator API running on port ${PORT}`);
});

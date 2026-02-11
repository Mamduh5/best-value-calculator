const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { calculateBestValue } = require("./calculator/calculate");
const { success, error } = require("./utils/response");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many requests. Please try again later.",
    },
  },
});

app.use(limiter);
app.post("/calculate", (req, res) => {
  try {
    const { options } = req.body;

    if (!options || !Array.isArray(options) || options.length < 2) {
      return error(
        res,
        400,
        "At least two options are required.",
        "INVALID_INPUT"
      );
    }

    const results = calculateBestValue(options);

    return success(res, { results }, "Calculation successful");
    
  } catch (err) {
    return error(
      res,
      500,
      "Something went wrong.",
      "INTERNAL_ERROR"
    );
  }
});


app.get("/health", (_req, res) => {
  return success(res, { status: "ok" }, "API is healthy");
});

app.listen(PORT, () => {
  console.log(`Best Value Calculator API running on port ${PORT}`);
});

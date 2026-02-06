const router = require("express").Router();
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  res.json(await Student.find());
});

router.post("/", auth, async (req, res) => {
  res.json(await Student.create(req.body));
});

module.exports = router;

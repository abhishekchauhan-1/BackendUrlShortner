const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const linkController = require("../controllers/linkController");

router.use(authenticateUser);

router.post("/shorten",linkController.shortenUrl);
router.get("/urls",linkController.getUserStatistics);

module.exports = router;

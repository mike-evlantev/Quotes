const router = require("express").Router();
const controller = require("../controllers/quotes");

router.get("/", controller.getQuoteAsync);
router.post("/new", controller.createQuoteAsync);

module.exports = router;


const router = require('express').Router();

const { transactionFindAll, transactionAdd } = require('../controllers/transtaction.controller');

router.get("/", transactionFindAll);
router.get("/:id");
router.post("/", transactionAdd);

module.exports = router;
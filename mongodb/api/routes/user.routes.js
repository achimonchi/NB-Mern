const router = require('express').Router();

const { userFindAll, userAdd } = require('./../controllers/user.controllers')

router.get('/', userFindAll);
router.post('/', userAdd);

module.exports = router;
const router = require('express').Router();

const { userFindAll } = require('./../controllers/user.controllers')

router.get('/', userFindAll);

module.exports = router;
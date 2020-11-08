const router = require('express').Router();

const { userFindAll, userAdd, userUpdate } = require('./../controllers/user.controllers')

router.get('/', userFindAll);
router.post('/', userAdd);
router.put('/update/:id', userUpdate);

module.exports = router;
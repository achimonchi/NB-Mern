const router = require('express').Router();

const { 
    userFindAll, 
    userAdd, 
    userUpdate, 
    userDelete 
} = require('./../controllers/user.controllers')

router.get('/', userFindAll);
router.post('/', userAdd);
router.put('/update/:_id', userUpdate);
router.delete('/delete/:_id', userDelete)

module.exports = router;
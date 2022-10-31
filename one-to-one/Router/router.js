const router=require('express').Router()
const controller=require('../Controller/userController')

router.post('/add',controller.addUser)
router.get('/findAll',controller.getAll)
router.put('/update/:id',controller.updateDetails)
router.delete('/removeById/:id',controller.deleteDetails)
router.get('/findById/:id',controller.findById)

//bulk operation

router.post('/bulkAdd',controller.bulkAdd)
router.put('/bulkUpdate',controller.bulkupdate)
router.delete('/bulkDelete',controller.bulkDelete)

module.exports=router
const express = require('express')
const router = express.Router()

const {createOwner} = require('../controllers/owner')
const {auth,isUser,isStaff} = require('../middlewares/middleware')

router.post('/createOwner',auth,createOwner)


module.exports = router
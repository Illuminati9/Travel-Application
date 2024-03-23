const express = require('express')
const router = express.Router()

const {createOwner} = require('../controllers/owner')
const {auth,isUser,isStaff,isOwner} = require('../middlewares/middleware')
const { createBus, getBuses, getBus } = require('../controllers/bus')

router.post('/registerOwner',auth,createOwner)

//! Bus Routes
router.post('/createBus',auth,isOwner,createBus)
router.get('/getBuses',auth,isOwner,getBuses)
router.get('/getBusById',auth,isOwner, getBus)

module.exports = router
const express = require('express')
const router = express.Router()

const {createOwner} = require('../controllers/owner')
const {auth,isUser,isStaff,isOwner} = require('../middlewares/middleware')
const { createBus, getBuses, getBus, createSeats, addStops, getStops, editStops, getSeats, editSeats } = require('../controllers/bus')

router.post('/registerOwner',auth,createOwner)

//! Bus Routes
router.post('/createBus',auth,isOwner,createBus)
router.get('/getBuses',auth,isOwner,getBuses)
router.get('/getBusById',auth,isOwner, getBus)

//! Essential routes for bus
router.post('/createSeats/:busId',auth,isOwner,createSeats)
router.get('/getSeats/:busId',auth,getSeats)
router.put('/editSeats/:busId',auth,isOwner,editSeats)

//! Essential stop routes for bus
router.post('/addStops/:busId',auth,isOwner,addStops)
router.get('/getStops/:busId',auth,getStops)
router.put('/editStops/:busId',auth,isOwner,editStops);

module.exports = router
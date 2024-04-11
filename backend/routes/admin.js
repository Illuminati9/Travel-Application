const express = require('express')
const router = express.Router()

const { isAdmin, isUser, auth } = require('../middlewares/middleware')
const { getStops, getStop, createStop, updateStop, deleteStop, getStopById } = require('../controllers/stop')
const {getUser, getUsers, getUserBasedPhoneNumber, getBookingsBasedOnPhoneNumber, getBookingsBasedOnUserId, getOwners, getBooking, getOwnerById, getBuses, getBusById} = require('../controllers/admin')

//! Stop Routes
router.get('/stops', auth, getStops)
router.get('/stop',auth, getStop)
router.get('/stop/:id',auth,getStopById)
router.post('/stop',auth,isAdmin, createStop)
router.put('/stop/:id/address/:addressId',auth,isAdmin, updateStop)
router.delete('/stop/:id',auth,isAdmin, deleteStop)

//! Admin Routes
router.get('/users',auth,isAdmin, getUsers)
router.get('/user/:id',auth,isAdmin, getUser)
router.get('/userPhone',auth,isAdmin, getUserBasedPhoneNumber)
router.get('/owner',auth,isAdmin, getOwners)
router.get('/owner/:id',auth,isAdmin, getOwnerById);

//! Bus Routes
router.get('/buses',auth,isAdmin, getBuses)
router.get('/bus/:id',auth,isAdmin,getBusById);

//! Booking Routes
router.get('/bookings/:phoneNumber', auth, isAdmin, getBookingsBasedOnPhoneNumber)
router.get('/bookings/:userId',auth,isAdmin,getBookingsBasedOnUserId);
router.get('/booking/:id',auth,isAdmin, getBooking);

module.exports = router
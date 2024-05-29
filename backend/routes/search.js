const express= require('express')
const router = express.Router()

const {getTravelBuses,createTravel} = require('../controllers/travel')
const {auth,isUser,isStaff,isOwner, isAdmin} = require('../middlewares/middleware')

router.get('/searchTravel',getTravelBuses)
router.post('/createTravel',auth,isOwner,createTravel)

module.exports = router
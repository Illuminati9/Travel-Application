const User = require('../models/user')
const OTP = require('../models/otp')
const Stop = require('../models/stop')
const AddressModel = require('../models/address')

exports.getStops = async (req, res) => {
    try {
        const stops = await Stop.find({});

        if (!stops) {
            return res.status(404).json({
                success: true,
                message: "No Stops Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Stops Fetched Successfully",
            stops
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Stops",
            error: error.message
        })
    }
}

exports.getStopById = async(req,res)=>{
    try {
        const {id} = req.params;

        const stop = await Stop.findById(id);

        if(!stop) {
            return res.status(404).json({
                success: true,
                message: "No Stop Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Stop Fetched Successfully",
            stop
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Stop",
            error: error.message
        })
    }
}

exports.getStopByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please Provide A Name"
            })
        }

        const stops = await Stop.find({
            $or: [
                { stopName: { $regex: name, $options: 'i' } },
                { city: { $regex: name, $options: 'i' } }
            ]
        });

        if(!stops) {
            return res.status(404).json({
                success: true,
                message: "No Stops Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Stops Fetched Successfully",
            stops
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Stops",
            error: error.message
        })
    }
}

exports.createStop = async (req,res)=>{
    try {
        const {stopName, stopAddress, city, pincode} = req.body;
        const {street, state, country} = stopAddress;

        if(!stopName || !street || !city || !state || !country || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All The Required Details"
            })
        }

        const pincodeRegex =/^\d{6}$/;

        if(!pincodeRegex.test(pincode)) {
            return res.status(400).json({
                success: false,
                message: "Please Provide A Valid Pincode"
            })
        }

        const address = await AddressModel.create({
            street,
            city,
            state,
            country,
            pincode
        })

        const stop = await Stop.create({
            stopName,
            stopAddress: address._id,
            city,
            pincode
        });

        if(!stop) {
            return res.status(400).json({
                success: false,
                message: "Stop Not Created"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Stop Created Successfully",
            stop
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Creating Stop",
            error: error.message
        })
    }
}

exports.updateStop = async (req, res) => {
    try {
        const {id} = req.params;
        const {stopName, stopAddress, city, pincode} = req.body;
        const {street, state, country} = stopAddress;

        if(!stopName || !street || !state || !country || !city || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All The Required Details"
            })
        }

        

        const pincodeRegex =/^\d{6}$/;
        if(!pincodeRegex.test(pincode)) {
            return res.status(400).json({
                success: false,
                message: "Please Provide A Valid Pincode"
            })
        }

        const stopInstance = await Stop.findById(id);

        const stopAddressInstance = await AddressModel.findByIdAndUpdate(stopInstance.stopAddress, {
            street,
            city,
            state,
            country,
            pincode
        }, {new: true});
    
        const stop = await Stop.findByIdAndUpdate(id, {
            stopName,
            stopAddress: stopAddressInstance._id,
            city,
            pincode
        }, {new: true});

        const finalStop = await Stop.findById(id).populate('stopAddress').exec();

        if(!stop) {
            return res.status(400).json({
                success: false,
                message: "Stop Not Updated"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Stop Updated Successfully",
            stop: finalStop
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Updating Stop",
            error: error.message
        })
    }
}

exports.deleteStop = async(req,res)=>{
    try {
        const {id} = req.params;

        const stopInstance = await Stop.findById(id);

        await AddressModel.findByIdAndDelete(stopInstance.stopAddress);

        await Stop.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Stop Deleted Successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Deleting Stop",
            error: error.message
        })
    }
}
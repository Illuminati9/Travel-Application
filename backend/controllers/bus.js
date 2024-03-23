const mongoose = require('mongoose')
const fs = require('fs')

const BusModel = require('../models/bus')
const BusDetailsModel = require('../models/busDetails')
const OwnerModel = require('../models/ownerDetails')
const StaffModel = require('../models/staff')
const UserModel = require('../models/user')
const AddressModel = require('../models/address')
const SeatModel = require('../models/seat')

const { Owner } = require('../utils/enumTypes')
const { busS3Url, allowedFileTypes } = require('../utils/constants')

exports.createBus = async (req, res) => {
    try {
        const { name, number, seatCapacity, sourceStop, destinationStop, parkingAddress, stops, busDetails } = req.body;
        const { street, city, state, country, pinCode } = parkingAddress;
        const { busType, capacity, fuelType, fuelCapacity } = busDetails;
        const { certificates } = req.files;

        if (!name || !number || !seatCapacity || !sourceStop || !destinationStop || !parkingAddress || !stops || !busDetails) {
            return res.status(400).json({
                success: false,
                message: "Please give required details"
            })
        }

        if (!busType || !capacity || !certificates || !fuelType || !fuelCapacity) {
            return res.status(400).json({
                success: false,
                message: "Please give required bus details"
            })
        }

        if (!street || !city || !state || !country || !pinCode) {
            return res.status(400).json({
                success: false,
                message: "Please give required parking address details"
            })
        }

        const numberPattern = /^[A-Za-z]{2}\s\d{2}\s[A-Za-z]{2}\s\d{4}$/;
        if(!numberPattern.test(number)){
            return res.status(400).json({
                success: false,
                message: "Registration Number of the Bus doen't follow the norms",
            })
        }

        const { id } = req.user;

        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        if (user.accountType != Owner) {
            return res.status(400).json({
                success: false,
                message: "You are not an owner"
            })
        }

        const owner = await OwnerModel.findById(user.ownerDetails);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "Owner Not Found"
            })
        }

        const addressInstance = await AddressModel.create({
            street, city, state, country, pinCode
        })

        const certiifcatesArray = [];
        for (const certificate of certificates) {
            const filePath = `${busS3Url}/${id}/${certificate.name}`;
            const fileStream = fs.createReadStream(certificate.tempFilePath);

            if (!fileStream) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to upload certificate"
                })
            }

            if (!allowedFileTypes.includes(certificate.mimetype)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid File Type"
                })
            }

            await uploadImageToS3_Type2({
                filePath: filePath,
                contentType: certificate.mimetype,
                body: fileStream
            })

            const imageUrl = await getObjectUrl(filePath)

            if (!imageUrl) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to upload certificate"
                })
            }

            certiifcatesArray.push(imageUrl);
        }


        const busDetailsInstance = await BusDetailsModel.create({
           busType, capacity, certificates: certiifcatesArray, fuelType, fuelCapacity
        });
        
        const busInstance = await BusModel.create({
            name, 
            number, 
            seatCapacity, 
            sourceStop, 
            destinationStop, 
            parkingAddress: addressInstance._id, 
            stops, busDetails: busDetailsInstance._id
        })

        busDetailsInstance.busId = busInstance._id;

        await busDetailsInstance.save();
        
        const seatsArray = [];
        
        for(let i=1;i<=seatCapacity; i++){
            const seat = await SeatModel.create({
                number: i,
                busId: busInstance._id,
            })

            seatsArray.push(seat);
        }

        busInstance.seats = seatsArray;
        await busInstance.save();

        return res.status(201).json({
            success: true,
            message: "Bus Created Successfully",
            bus: busInstance,
            busDetails,
            address: addressInstance
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "An Error Occurred While Creating Bus",
        })
    }
}

exports.getBuses = async (req, res) => {
    try {
        const buses = await BusModel.find().populate('sourceStop').populate('destinationStop').populate('stops').populate('parkingAddress').populate('busDetails').populate('seats');

        if (!buses) {
            return res.status(400).json({
                success: true,
                message: "No Buses Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Buses Fetched Successfully",
            buses,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Buses",
            error: error.message,
        })
    }
}

exports.getBus = async(req,res)=>{
    try {
        const {id}= req.body || req.params|| req.query;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Bus ID is Required",
            });
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Bus ID",
            });
        }

        const bus = await BusModel.findById(id).populate('sourceStop').populate('destinationStop').populate('stops').populate('parkingAddress').populate('busDetails').populate('seats');

        return res.status(200).json({
            success: true,
            message: "Bus Fetched Successfully",
            bus,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Bus",
            error: error.message,
        })
    }
}
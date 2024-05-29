const mongoose = require('mongoose');

const travelModel = require('../models/travel');
const busModel = require('../models/bus');
const stopModel = require('../models/stop');


exports.getTravelBuses = async (req, res) => {
    try {
        const { source, destination, date } = req.query;

        console.log(date);

        if (!source || !destination || !date) {
            return res.status(400).json({
                message: "Source, Destination and Date are required",
                success: false
            })
        }

        if (source === destination) {
            return res.status(400).json({
                message: "Source and Destination can't be same",
                success: false
            })
        }

        const sourceStop = await stopModel.findOne({ city: source });
        const destinationStop = await stopModel.findOne({ city: destination });

        if (!sourceStop || !destinationStop) {
            return res.status(404).json({
                message: "Source or Destination not found",
                success: false
            })
        }

        const travelsBuses = await travelModel.find({
            $or:[
                {departure: {$gte: new Date(date)}},
            ]
        });
        console.log(travelsBuses)
        let finalBuses = [];
        for (let travel of travelsBuses) {
            const bus = await busModel.findById(travel.busId).populate('stops').exec();
            console.log(bus, 'kksdjflkajslkdf')
            for (let i = 0; i < bus.stops.length; i++) {
                if (bus.stops[i].city.toString() === source) {
                    for (let j = i + 1; j < bus.stops.length; j++) {
                        if (bus.stops[j].city.toString() === destination) {
                            finalBuses.push(travel);
                        }
                    }
                }
            }
        }

        if (finalBuses.length === 0) {
            return res.status(404).json({
                message: "No buses found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Travel buses found",
            success: true,
            data: finalBuses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong in getting travel buses",
            success: false,
            error: error.message
        })
    }
}

exports.createTravel = async (req, res) => {
    try {
        const { busId,
            source,
            destination,
            departure,
            arrival,
            price,
            seatCapacity,
            availableSeats,
            distance } = req.body;
        console.log("hello world 143")
        console.log(departure)
        if (!busId || !source || !destination || !departure || !arrival || !price || !seatCapacity || !availableSeats || !distance) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        if (!mongoose.Types.ObjectId.isValid(busId)) {
            return res.status(400).json({
                message: "Invalid bus id",
                success: false
            })
        }

        const bus = await busModel.findById(busId);

        if (!bus) {
            return res.status(404).json({
                message: "Bus not found",
                success: false
            })
        }

        const sourceStop = await stopModel.findById(source);
        const destinationStop = await stopModel.findById(destination)

        if (!sourceStop || !destinationStop) {
            return res.status(404).json({
                message: "Source or Destination not found",
                success: false
            })
        }

        const travel = new travelModel({
            busId,
            source: sourceStop._id,
            destination: destinationStop._id,
            departure: Date.parse(departure),
            arrival: Date.parse(arrival),
            price,
            seatCapacity,
            availableSeats,
            distance
        })

        await travel.save();

        return res.status(201).json({
            message: "Travel created successfully",
            success: true,
            data: travel
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong in creating travel",
            success: false,
            error: error.message
        })
    }
}
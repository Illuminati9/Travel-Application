import 'package:app/app/models/stop.dart';

class Travel {
  String? sId;
  BusId? busId;
  Stop? source;
  Stop? destination;
  DateTime? departure;
  DateTime? arrival;
  int? seatCapacity;
  int? price;
  int? availableSeats;
  int? distance;

  Travel(
      {this.sId,
      this.busId,
      this.source,
      this.destination,
      this.departure,
      this.seatCapacity,
      this.arrival,
      this.price,
      this.availableSeats,
      this.distance});

  Travel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    busId = json['busId'] != null ? BusId.fromJson(json['busId']) : null;
    source =
        json['source'] != null ?  Stop.fromJson(json['source']) : null;
    destination = json['destination'] != null
        ?  Stop.fromJson(json['destination'])
        : null;
    departure = DateTime.parse(json['departure']);
    arrival = DateTime.parse(json['arrival']);
    seatCapacity = json['seatCapacity'];
    price = json['price'];
    availableSeats = json['availableSeats'];
    distance = json['distance'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data =  Map<String, dynamic>();
    data['_id'] = sId;
    if (busId != null) {
      data['busId'] = busId!.toJson();
    }
    if (source != null) {
      data['source'] = source!.toJson();
    }
    if (destination != null) {
      data['destination'] = destination!.toJson();
    }
    data['departure'] = departure;
    data['seatCapacity'] = seatCapacity;
    data['arrival'] = arrival;
    data['price'] = price;
    data['availableSeats'] = availableSeats;
    data['distance'] = distance;
    return data;
  }
}

class BusId {
  String? sId;
  String? name;
  String? number;
  int? seatCapacity;
  String? sourceStop;
  String? destinationStop;
  List<String>? stops;
  String? parkingAddress;
  String? ownerId;
  String? busDetails;

  BusId(
      {this.sId,
      this.name,
      this.number,
      this.seatCapacity,
      this.sourceStop,
      this.destinationStop,
      this.stops,
      this.parkingAddress,
      this.ownerId,
      this.busDetails});

  BusId.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    number = json['number'];
    seatCapacity = json['seatCapacity'];
    sourceStop = json['sourceStop'];
    destinationStop = json['destinationStop'];
    stops = json['stops'].cast<String>();
    parkingAddress = json['parkingAddress'];
    ownerId = json['ownerId'];
    busDetails = json['busDetails'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data =  Map<String, dynamic>();
    data['_id'] = sId;
    data['name'] = name;
    data['number'] = number;
    data['seatCapacity'] = seatCapacity;
    data['sourceStop'] = sourceStop;
    data['destinationStop'] = destinationStop;
    data['stops'] = stops;
    data['parkingAddress'] = parkingAddress;
    data['ownerId'] = ownerId;
    data['busDetails'] = busDetails;
    return data;
  }
}


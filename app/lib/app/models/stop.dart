class Stop {
  String? id;
  String? stopName;
  String? stopAddress;
  String? city;
  int? pincode;

  Stop({this.id, this.stopName, this.stopAddress, this.city, this.pincode});

  Stop.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    stopName = json['stopName'];
    stopAddress = json['stopAddress'];
    city = json['city'];
    pincode = json['pincode'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data =  Map<String, dynamic>();
    data['_id'] = id;
    data['stopName'] = stopName;
    data['stopAddress'] = stopAddress;
    data['city'] = city;
    data['pincode'] = pincode;
    return data;
  }
}
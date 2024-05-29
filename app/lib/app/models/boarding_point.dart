class BoardingPoint {
  String name;
  String address;
  String contact;
  String time;
  String type;
  String id;

  BoardingPoint(
      {required this.name,
      required this.address,
      required this.contact,
      required this.time,
      required this.type,
      required this.id});

  factory BoardingPoint.fromJson(Map<String, dynamic> json) {
    return BoardingPoint(
        name: json['name'],
        address: json['address'],
        contact: json['contact'],
        time: json['time'],
        type: json['type'],
        id: json['id']);
  }
}

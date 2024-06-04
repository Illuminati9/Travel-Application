import 'package:app/app/models/stop.dart';
import 'package:get/get.dart';

class HomeController extends GetxController{
  final Rx<Stop> departure = Stop().obs;
  final Rx<Stop> destination = Stop().obs;

  final Rx<DateTime> selectedDate = DateTime.now().obs;

  void setDeparture(Stop stop){
    departure.value = stop;
    update();
  }

  void setDestination(Stop stop){
    destination.value = stop;
    update();
  }

  void setDate(DateTime date){
    selectedDate.value = date;
    update();
  }

  void swapStops(){
    final Stop temp = departure.value;
    departure.value = destination.value;
    destination.value = temp;
    update();
  }
}
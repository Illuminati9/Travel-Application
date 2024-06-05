import 'package:app/app/modules/seat_selection/controllers/boarding_point_controller.dart';
import 'package:get/get.dart';

class BoardingPointBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<BoardingPointController>(() => BoardingPointController());
  }
}
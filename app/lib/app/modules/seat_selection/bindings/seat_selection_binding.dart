import 'package:app/app/modules/seat_selection/controllers/seat_selection_controller.dart';
import 'package:get/get.dart';

class SeatSelectionBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<SeatSelectionController>(
      () => SeatSelectionController(),
    );
  }
}
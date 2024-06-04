import 'package:app/app/modules/stop_selector/controllers/stop_selector_controller.dart';
import 'package:get/get.dart';

class StopSelectorBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<StopSelectorController>(
      () => StopSelectorController(),
    );
  }
}
import 'package:app/app/modules/bookings/controllers/booking_controller.dart';
import 'package:get/get.dart';

class BookingBinding extends Bindings{
  @override
  void dependencies() {
    Get.lazyPut(() => BookingController());
  }
}
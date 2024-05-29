import 'package:app/app/modules/home/views/home_view.dart';
import 'package:app/app/modules/search/views/search_result_view.dart';
import 'package:app/app/modules/seat_selection/views/boarding_point_selection_view.dart';
import 'package:app/app/modules/seat_selection/views/seat_selection_view.dart';
import 'package:app/app/modules/stop_selector/views/stop_selector_view.dart';
import 'package:get/get.dart';

part 'app_routes.dart';

class AppPages{
  AppPages._();
  static const HOME = Routes.HOME;
  static const SEARCHRESULT = Routes.SEARCHRESULT;
  static const STOPSELECTOR = Routes.STOPSELECTOR;
  static const SEATSELECTOR = Routes.SEATSELECTOR;
  static const BOARDINGPOINTSELECTOR = Routes.BOARDINGPOINTSELECTOR;

  static final routes = [
    GetPage(name: _Paths.HOME, page: () => const HomeView()),
    GetPage(name: _Paths.SEARCHRESULT, page: () => const SearchResultView()),
    GetPage(name: _Paths.STOPSELECTOR, page: () => const StopSelectorView()),
    GetPage(name: _Paths.SEATSELECTOR, page: () => const SeatSelectionView()),
    GetPage(name: _Paths.BOARDINGPOINTSELECTOR, page: ()=> const BoardingPointSelectorView()),
  ];
}
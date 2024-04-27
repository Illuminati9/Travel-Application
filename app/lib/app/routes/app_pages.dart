import 'package:app/app/modules/home/views/home_view.dart';
import 'package:app/app/modules/search/views/search_result_view.dart';
import 'package:get/get.dart';

part 'app_routes.dart';

class AppPages{
  AppPages._();
  static const HOME = Routes.HOME;
  static const SEARCHRESULT = Routes.SEARCHRESULT;

  static final routes = [
    GetPage(name: _Paths.HOME, page: () => const HomeView()),
    GetPage(name: _Paths.SEARCHRESULT, page: () => const SearchResultView()),
  ];
}
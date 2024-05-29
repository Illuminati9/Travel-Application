part of 'app_pages.dart';

class Routes{
  Routes._();
  static const HOME = _Paths.HOME;
  static const SEARCHRESULT = _Paths.SEARCHRESULT;
  static const STOPSELECTOR = _Paths.STOPSELECTOR;
  static const SEATSELECTOR = _Paths.SEATSELECTOR;
  static const BOARDINGPOINTSELECTOR = _Paths.BOARDINGPOINTSELECTOR;
}

abstract class _Paths{
  _Paths._();
  static const HOME='/home';
  static const SEARCHRESULT = '/search-result-page';
  static const STOPSELECTOR = '/stop-selector';
  static const SEATSELECTOR = '/seat-selector';
  static const BOARDINGPOINTSELECTOR = '/boarding-point-selector';
}
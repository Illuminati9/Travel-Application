part of 'app_pages.dart';

class Routes{
  Routes._();
  static const HOME = _Paths.HOME;
  static const SEARCHRESULT = _Paths.SEARCHRESULT;
}

abstract class _Paths{
  _Paths._();
  static const HOME='/home';
  static const SEARCHRESULT = '/search-result-page';
}
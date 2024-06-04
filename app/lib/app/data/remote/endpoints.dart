class Endpoints{
  static const String apiV1 = "/api/v1";
  //! auth
  static const String loginApi = "$apiV1/auth/login";
  static const String signupApi = "$apiV1/auth/signUp";
  static const String logoutApi = "$apiV1/auth/logout";

  //! Admin
  static const String searchStopsApi = "$apiV1/admin/stops";
  //! Search
  static const String searchApi = "$apiV1/search/searchTravel";
  static const String searchStopsApiGet = "$apiV1/search/stops";
}
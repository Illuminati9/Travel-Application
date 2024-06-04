import 'package:flutter_dotenv/flutter_dotenv.dart';

abstract class ApiInterface {
  static String baseUrl = dotenv.env['BACKEND_URL'].toString();
  static String? auth =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk0OTE0MjY4MzUiLCJpZCI6IjY2NWRhOTg5MTMxNGNjYjY0ODhlMGY4NiIsImFjY291bnRUeXBlIjoidXNFciIsImlhdCI6MTcxNzQ2NTM5OCwiZXhwIjoxNzIwMDU3Mzk4fQ.c2HawPF2VTRYzjerooAqJ7VQbYeX7fCvud3o7yefD8Y";

  Future getApi({
    String? url,
    Map<String, String>? headers,
  });

  Future postApiWithoutHeader({
    String? url,
    Map? data,
  });

  Future postApi({
    String? url,
    Map<String, String>? headers,
    Map? data,
  });

  Future putApi({
    String? url,
    Map<String, String>? headers,
    Map? data,
  });

  Future deleteApi({
    String? url,
    Map<String, String>? headers,
    Map? data,
  });
}

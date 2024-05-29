abstract class ApiInterface{
  static const baseUrl = "https://travel-application-ueas.onrender.com";
  static String? auth = "";

  Future getApi({
    String? url,
    Map<String, String>? headers,
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
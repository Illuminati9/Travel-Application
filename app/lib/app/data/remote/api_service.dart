import 'dart:convert';

import 'package:app/app/data/remote/endpoints.dart';
import 'package:app/app/service/helper/dialog_helper.dart';
import 'package:http/http.dart' as http;
import 'package:app/app/data/remote/api_interface.dart';
import 'package:intl/intl.dart';

class ApiService extends ApiInterface {
  @override
  Future deleteApi(
      {String? url, Map<String, String>? headers, Map? data}) async {
    var client = http.Client();
    final response = await client.delete(
      Uri.parse(url!),
      headers: <String, String>{
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': ApiInterface.auth!
      },
    );
    return response;
  }

  @override
  Future getApi({
    String? url,
    Map<String, String>? headers,
  }) async {
    var client = http.Client();
    print(url);
    final response = await client.get(Uri.parse(url!),
        headers: headers ??
            <String, String>{
              'accept': 'application/json',
              'content-type': 'application/json',
              'authorization': ApiInterface.auth!
            });
    return response;
  }

  @override
  Future postApi({String? url, Map<String, String>? headers, Map? data}) async {
    var client = http.Client();
    print("======================Post=======================");
    print(data);
    http.Response res = await client.post(Uri.parse(url!),
        headers: headers ??
            <String, String>{
              'Content-Type': 'application/json',
              'Authorization': ApiInterface.auth.toString()
            },
        body: jsonEncode(data));
    print(res.body);
    print("======================Post=======================");

    return res;
  }

  @override
  Future postApiWithoutHeader(
      {String? url, Map<String, String>? headers, Map? data}) async {
    var client = http.Client();
    print("======================Post Without Header=======================");
    print(data);
    final res = await client.post(Uri.parse(url!),
        body: jsonEncode(data));
    print("======================Post Without Header=======================");
    print(res.body);
    return res;
  }

  @override
  Future putApi({String? url, Map<String, String>? headers, Map? data}) async {
    var client = http.Client();
    final response = await client.put(Uri.parse(url!),
        headers: headers ??
            <String, String>{
              'accept': 'application/json',
              'content-type': 'application/json',
              'authorization': ApiInterface.auth!
            },
        body: jsonEncode(data));
    return response;
  }

  Map<String, dynamic>? _parseBaseResponse(http.Response res) {
    print("--------------------------------------");
    Map<String, dynamic> response = jsonDecode(res.body);
    print(response);
    if (response.containsKey("error")) {
      try {
        List entryList = response['error'].entries.toList();
        List<dynamic> errorList = [];
        entryList.forEach((element) {
          errorList.add(element.value.first);
        });
        DialogHelper.showErrorDialog("Error", errorList.join("\n"));
      } catch (e) {
        DialogHelper.showErrorDialog("Error", response['error']);
      }
      return null;
    } else {
      return response;
    }
  }

  Future<http.Response> getAllStops() async {
    http.Response res =
        await getApi(url: '${ApiInterface.baseUrl}${Endpoints.searchStopsApi}');
    print('Search Stops Response: $res');
    return res;
  }

  Future<http.Response> getTravelDetails(String departure, String destination, DateTime date) async {
    http.Response res = await postApiWithoutHeader(
        url: '${ApiInterface.baseUrl}${Endpoints.searchApi}?source=$departure&destination=$destination&date=${DateFormat('yyyy-MM-dd').format(date)}');
    print('Search Stops Response: $res');
    return res;
  }
}

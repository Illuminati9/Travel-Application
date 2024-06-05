import 'dart:convert';

import 'package:app/app/data/remote/api_service.dart';
import 'package:app/app/models/stop.dart';
import 'package:app/app/models/travel.dart';
import 'package:get/get.dart';

class BoardingPointController extends GetxController{
  final Travel travelDetails = Get.arguments;
  final RxList<Stop> boardingPoints = RxList<Stop>.empty(growable: true);
  final RxList<Stop> droppingPoints = RxList<Stop>.empty(growable: true);
  final RxBool isLoading = false.obs;
  final RxBool isBoardingPointSelected = false.obs;
  final RxBool isBoardingPointDataNotAvailable = true.obs;
  final RxBool isDropPointDataNotAvailable = true.obs;
  final RxBool isDropPointSelected = false.obs;
  final Rx<Stop> selectedBoardingPoint = Stop().obs;
  final Rx<Stop> selectedDropPoint = Stop().obs;

  @override
  void onInit() async {
    super.onInit();
    isLoading(true);
    update();
    await fetchBoardingPoints(city: travelDetails.source?.city.toString());
    await fetchDroppingPoints(city: travelDetails.destination?.city.toString());
    isLoading(false);
    update();
  }

  Future<void> fetchBoardingPoints({String? city}) async{
    try {
      dynamic res = await ApiService().getCityDetails(city.toString());

      if(res.statusCode == 200){
        dynamic body = jsonDecode(res.body);
        dynamic data = body['stops'];
        print('$data dkkjfalkdjsf');
        if(data?.length!=0){
          for(var i in data){
            boardingPoints.add(Stop.fromJson(i));
          }
          isBoardingPointDataNotAvailable(false);
        }
      }
    } catch (e) {
      print(e);
    } 
  }

  Future<void> fetchDroppingPoints({String? city}) async{
    try {
      dynamic res = await ApiService().getCityDetails(city.toString());
      if(res.statusCode == 200){
        dynamic body = jsonDecode(res.body);
        dynamic data = body['stops'];
        print(data);
        if(data?.length!=0){
          for(var i in data){
            droppingPoints.add(Stop.fromJson(i));
          }
          isDropPointDataNotAvailable(false);
        }
      }
    } catch (e) {
      print(e);
    } 
  }
}
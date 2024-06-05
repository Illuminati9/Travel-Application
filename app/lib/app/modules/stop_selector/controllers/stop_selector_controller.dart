import 'dart:convert';

import 'package:app/app/data/remote/api_service.dart';
import 'package:app/app/models/stop.dart';
import 'package:app/app/modules/home/controllers/home_controller.dart';
import 'package:get/get.dart';

class StopSelectorController extends GetxController{
  RxList<Stop> stopList = <Stop>[].obs;
  var selectedStop = ''.obs;
  RxBool isLoading = false.obs;
  var isDataNotAvailable = true.obs;

  @override
  void onInit() async{
    super.onInit();
    isLoading.value = true;
    update();
    await fetchStops();
    isLoading.value = false;
    update();
  }

  Future<void> fetchStops()async{
    try{
      dynamic response = await ApiService().getAllStops();
      if(response?.statusCode==200){
        response = jsonDecode(response.body);
        if(response['stops']!=null){
          for(var stop in response['stops']){
            stopList.add(Stop.fromJson(stop));
          }
          isDataNotAvailable(false);
        }
      }
    } catch(e){
      isDataNotAvailable(true);
      print(e);
    }   
  }

  void selectStop(Stop stop){
    print(Get.arguments);
    if(Get.arguments=='departure'){
      Get.find<HomeController>().setDeparture(stop);
    } else{
      Get.find<HomeController>().setDestination(stop);
    }
  }
}
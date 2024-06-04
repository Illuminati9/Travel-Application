import 'dart:convert';

import 'package:app/app/data/remote/api_service.dart';
import 'package:app/app/models/stop.dart';
import 'package:app/app/models/travel.dart';
import 'package:get/get.dart';

class SearchPageController extends GetxController{
  final Stop departure = Get.arguments['departure'] ?? Stop();
  final Stop destination = Get.arguments['destination'] ?? Stop();
  final DateTime selectedDate = Get.arguments['date'] ?? DateTime.now();
  RxBool isLoading = false.obs;
  RxBool isDataNotAvailable = false.obs;

  final RxList<Travel> travelDetails = <Travel>[].obs;

  @override
  void onInit() async {
    // TODO: implement onInit
    super.onInit();
    isLoading(true);
    update();
    await fetchTravelDetails();
    isLoading(false);
    update();
  }

  Future<void> fetchTravelDetails() async{
    try{
      print('${departure.city.toString()} ${destination.city.toString()} ${selectedDate.toString()}');
      dynamic response = await ApiService().getTravelDetails(
       departure.city.toString(),
      destination.city.toString(),
      selectedDate,
    );

    if(response?.statusCode==200){
      response = jsonDecode(response.body);
      for(var travel in response['data']){
        travelDetails.add(Travel.fromJson(travel));
      }
      print(travelDetails.length);
    }else{
      isDataNotAvailable(true);
    }
    }catch(e){
      isDataNotAvailable(true);
      print(e);
    }
    
  }
}
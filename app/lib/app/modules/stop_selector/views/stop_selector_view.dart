import 'package:app/app/modules/stop_selector/controllers/stop_selector_controller.dart';
import 'package:app/app/modules/stop_selector/widgets/stop_city.dart';
import 'package:app/app/modules/stop_selector/widgets/stop_sideheading.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:app/app/modules/universal/widgets/textfields/search_textfield.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class StopSelectorView extends StatefulWidget {
  const StopSelectorView({super.key});

  @override
  State<StopSelectorView> createState() => _StopSelectorViewState();
}

class _StopSelectorViewState extends State<StopSelectorView> {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<StopSelectorController>(
      init: StopSelectorController(),
      builder: (controller) {
        return Scaffold(
          appBar: AppBar(
            title: const Text(
              'Choose your City',
              style: TextStyle(color: kWhiteColor),
            ),
            leading: const BackButtonWidget(),
            backgroundColor: kPrimaryColor,
          ),
          // body: Column(
          //   crossAxisAlignment: CrossAxisAlignment.center,
          //   children: [
          //     const SearchTextFieldWidget(
          //       hintText: 'Search for City',
          //       isEnabled: true,
          //     ),
          //     const StopSideHeadingWidget(title: 'Popular Cities'),
          //     Expanded(
          //       child: ListView.builder(
          //         itemCount: popularCities.length,
          //         shrinkWrap: true,
          //         itemBuilder: ((context, index) {
          //           return StopCityWidget(cityName: popularCities[index]);
          //         }),
          //       ),
          //     ),
          //   ],
          // ),
          body: controller.isLoading.value == true
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : controller.isDataNotAvailable.value == true
                  ? const Center(
                      child: Text("No Cities Data Available"),
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const SearchTextFieldWidget(
                          hintText: 'Search for City',
                          isEnabled: true,
                        ),
                        const StopSideHeadingWidget(title: 'Cities'),
                        Expanded(
                          child: ListView.builder(
                            itemCount: controller.stopList.length,
                            shrinkWrap: true,
                            itemBuilder: ((context, index) {
                              return InkWell(
                                onTap: () {
                                  controller.selectStop(controller
                                      .stopList[index]);
                                  Get.back();
                                },
                                child: StopCityWidget(
                                    stop: controller.stopList[index]),
                              );
                            }),
                          ),
                        ),
                      ],
                    ),
        );
      },
    );
  }
}

import 'package:app/app/modules/search/controllers/search_controller.dart';
import 'package:app/utils/colors.dart';
import 'package:app/app/modules/search/widgets/bus_displaycard_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SearchResultView extends StatelessWidget {
  const SearchResultView({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<SearchPageController>(
      init: SearchPageController(),
      builder: (controller) {
        return Scaffold(
          appBar: AppBar(
            leading: const BackButtonWidget(),
            backgroundColor: kPrimaryColor,
            title: const Text(
              'Search Results',
              style: TextStyle(color: kWhiteColor),
            ),
          ),
          body: controller.isLoading.value == true
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : controller.isDataNotAvailable.value == true
                  ? const Center(
                      child: Text("No Data Available"),
                    )
                  : Column(children: [
                      Container(),
                      Expanded(
                        child: ListView.builder(
                            itemCount: controller.travelDetails.length,
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return BusDisplayCardWidget(
                                  busDetails: controller.travelDetails[index]);
                            }),
                      ),
                    ]),
        );
      },
    );
  }
}

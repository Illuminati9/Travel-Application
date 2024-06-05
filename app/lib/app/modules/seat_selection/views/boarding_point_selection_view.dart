import 'package:app/app/modules/seat_selection/controllers/boarding_point_controller.dart';
import 'package:app/app/modules/seat_selection/widgets/point_selection_widget.dart';
import 'package:app/app/modules/seat_selection/widgets/tabbar_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BoardingPointSelectorView extends StatefulWidget {
  const BoardingPointSelectorView({super.key});

  @override
  State<BoardingPointSelectorView> createState() =>
      _BoardingPointSelectorViewState();
}

class _BoardingPointSelectorViewState extends State<BoardingPointSelectorView> {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<BoardingPointController>(
        init: BoardingPointController(),
        builder: (controller) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Boarding & Drop Point',
                  style: TextStyle(color: kWhiteColor)),
              leading: const BackButtonWidget(),
              backgroundColor: kPrimaryColor,
            ),
            body: controller.isLoading.value == true
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                : controller.isBoardingPointDataNotAvailable.value ||
                        controller.isDropPointDataNotAvailable.value
                    ? const Center(
                        child: Text("No Data Available"),
                      )
                    : SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const TabWidget(
                                value: 2,
                                text: 'Boarding & Drop Point',
                                isActive: true),
                            PointSelectionWidget(
                                boardingPoints: controller.boardingPoints,
                                name: 'Boarding Points',
                                controller: controller,),
                            PointSelectionWidget(
                                boardingPoints: controller.droppingPoints,
                                name: 'Drop Points',
                                controller: controller,),
                            const SizedBox(height: 30),
                          ],
                        ),
                      ),
          );
        });
  }
}

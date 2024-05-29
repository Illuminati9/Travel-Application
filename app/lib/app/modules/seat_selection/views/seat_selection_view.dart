import 'package:app/app/modules/seat_selection/widgets/tabbar_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:app/app/modules/universal/widgets/buttons/primary_button.dart';
import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SeatSelectionView extends StatefulWidget {
  const SeatSelectionView({super.key});

  @override
  State<SeatSelectionView> createState() => _SeatSelectionViewState();
}

class _SeatSelectionViewState extends State<SeatSelectionView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Essentials',
          style: TextStyle(color: kWhiteColor),
        ),
        backgroundColor: kPrimaryColor,
        leading: const BackButtonWidget(),
      ),
      body: Column(
        children: <Widget>[
          const TabWidget(value: 1, text: 'Seat Selection', isActive: true),
          const Text('Hello world'),
          PrimaryButton(
            name: 'Continue',
            function: () {
              Get.toNamed(AppPages.BOARDINGPOINTSELECTOR);
            },
          ),
        ],
      ),
    );
  }
}

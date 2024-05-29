import 'package:app/app/modules/seat_selection/widgets/point_selection_widget.dart';
import 'package:app/app/modules/seat_selection/widgets/tabbar_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/data/fake_boarding_point_details.dart';
import 'package:flutter/material.dart';

class BoardingPointSelectorView extends StatefulWidget {
  const BoardingPointSelectorView({super.key});

  @override
  State<BoardingPointSelectorView> createState() =>
      _BoardingPointSelectorViewState();
}

class _BoardingPointSelectorViewState extends State<BoardingPointSelectorView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Boarding & Drop Point',
            style: TextStyle(color: kWhiteColor)),
        leading: const BackButtonWidget(),
        backgroundColor: kPrimaryColor,
      ),
      body: SingleChildScrollView(
        child: Container(
          color: kPrimaryBorderColor,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const TabWidget(
                  value: 2, text: 'Boarding & Drop Point', isActive: true),
              PointSelectionWidget(
                  boardingPoints: boardingPointDetails,
                  name: 'Boarding Points'),
              PointSelectionWidget(
                  boardingPoints: boardingPointDetails, name: 'Drop Points'),
              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }
}

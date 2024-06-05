import 'package:app/app/models/stop.dart';
import 'package:app/app/modules/seat_selection/controllers/boarding_point_controller.dart';
import 'package:app/app/modules/universal/widgets/textfields/search_textfield.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PointSelectionWidget extends StatelessWidget {
  const PointSelectionWidget(
      {super.key, required this.boardingPoints, required this.name, required this.controller});

  final List<Stop> boardingPoints;
  final String name;
  final BoardingPointController controller;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.all(10),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: kWhiteColor,
          borderRadius: BorderRadius.circular(5),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(name, style: TextStyle(color: kPrimaryColor, fontSize: 14.sp)),
            SearchTextFieldWidget(hintText: 'Select for $name', isEnabled: true),
            ListView.builder(
              itemCount: boardingPoints.length,
              physics: const NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              padding: const EdgeInsets.all(0),
              itemBuilder: ((context, index) {
                // final DateTime dateTime =
                //     DateTime.parse(boardingPoints[index].stopName);
                return ListTile(
                  leading: Radio(value: boardingPoints[index].id, groupValue: controller.selectedBoardingPoint.value.id, onChanged: (id){}),
                  title: Text(
                    boardingPoints[index].stopName!,
                    style:
                        TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                  ),
                  subtitle: Text(boardingPoints[index].stopAddress!),
                  trailing: Text(
                    boardingPoints[index].pincode!.toString(),
                    style:
                        TextStyle(fontWeight: FontWeight.w600, fontSize: 14.sp),
                  ),
                  onTap: () {
                    
                  },
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}

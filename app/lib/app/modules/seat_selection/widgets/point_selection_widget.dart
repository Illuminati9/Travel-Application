import 'package:app/app/models/boarding_point.dart';
import 'package:app/app/modules/universal/widgets/textfields/search_textfield.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class PointSelectionWidget extends StatelessWidget {
  const PointSelectionWidget(
      {super.key, required this.boardingPoints, required this.name});

  final List<BoardingPoint> boardingPoints;
  final String name;

  @override
  Widget build(BuildContext context) {
    return Container(
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
              final DateTime dateTime =
                  DateTime.parse(boardingPoints[index].time);
              return ListTile(
                title: Text(
                  boardingPoints[index].name,
                  style:
                      TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
                ),
                subtitle: Text(boardingPoints[index].address),
                trailing: Text(
                  '${dateTime.hour}:${dateTime.minute == 0 ? '00' : {
                      dateTime.minute
                    }} ${dateTime.hour > 12 ? 'PM' : 'AM'}',
                  style:
                      TextStyle(fontWeight: FontWeight.w600, fontSize: 14.sp),
                ),
                onTap: () {
                  print('Selected ${boardingPoints[index].name}');
                },
              );
            }),
          ),
        ],
      ),
    );
  }
}

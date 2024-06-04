import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class DateWidget extends StatelessWidget {
  const DateWidget({super.key, required this.date, required this.isSelected});

  final DateTime date;
  final bool isSelected;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 3),
      padding: const EdgeInsets.symmetric(horizontal: 5),
      width: Get.width / 6,
      decoration: BoxDecoration(
        color: isSelected ? kPrimaryColor : Colors.transparent,
        border: Border.all(color: kPrimaryBorderColor),
        borderRadius: BorderRadius.circular(5),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            date.day.toString(),
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isSelected ? kWhiteColor : kBlackColor,
            ),
          ),
          Text(
            DateFormat('EEEE').format(date).substring(0, 3),
            style: TextStyle(color: isSelected ? kWhiteColor : kBlackColor),
          )
        ],
      ),
    );
  }
}

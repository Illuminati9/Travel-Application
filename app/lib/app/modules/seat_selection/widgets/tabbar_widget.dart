import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';


class TabWidget extends StatelessWidget {
  const TabWidget(
      {super.key,
      required this.value,
      required this.text,
      required this.isActive});

  final int value;
  final String text;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    return Container(
          decoration: BoxDecoration(
            color: kWhiteColor,
    border: isActive
        ? const Border(bottom: BorderSide(color: kPrimaryColor))
        : null,
          ),
          child: Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      IconBadgeWithNumberWidget(number: value, isActive: isActive),
      const SizedBox(width: 5),
      Text(
        text,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(
          fontSize: 16.sp,
          color: isActive ? kPrimaryColor : kPrimaryBorderColor,
        ),
      ),
    ],
          ),
        );
  }
}

class IconBadgeWithNumberWidget extends StatelessWidget {
  const IconBadgeWithNumberWidget(
      {super.key, required this.number, required this.isActive});

  final int number;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: isActive ? kPrimaryColor : kPrimaryBorderColor),
      padding: const EdgeInsets.all(8),
      child: Text(
        number.toString(),
        style: TextStyle(
          color: kWhiteColor,
          fontSize: 10.sp,
        ),
      ),
    );
  }
}

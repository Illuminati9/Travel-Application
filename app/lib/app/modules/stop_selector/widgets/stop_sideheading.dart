import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class StopSideHeadingWidget extends StatelessWidget {
  const StopSideHeadingWidget({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      color: kPrimaryBorderColor,
      child: Text(
        title.capitalize.toString(),
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600,color: kSecondaryTextColor),
      ),
    );
  }
}

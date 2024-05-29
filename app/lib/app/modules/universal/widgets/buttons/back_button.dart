import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BackButtonWidget extends StatelessWidget {
  const BackButtonWidget({super.key, this.color});

  final Color? color;

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: Icon(
        Icons.arrow_back,
        color: color ?? kWhiteColor,
      ),
      onPressed: () {
        Get.back();
      },
    );
  }
}

import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class PrimarySideHeadingWidget extends StatelessWidget {
  const PrimarySideHeadingWidget({super.key, required this.data});
  final String data;
  @override
  Widget build(BuildContext context) {
    return Text(
      data,
      style: const TextStyle(
        color: primaryBorderColor,
        fontSize: 13,
      ),
    );
  }
}

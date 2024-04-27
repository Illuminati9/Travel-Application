import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class PrimaryBorder extends StatelessWidget {
  const PrimaryBorder({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 10),
      child: Divider(
        color: primaryBorderColor,
      ),
    );
  }
}

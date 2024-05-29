import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton(
      {super.key, required this.name, this.function, this.color});

  final String name;
  final Function()? function;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: TextButton(
        style: TextButton.styleFrom(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(5),
          ),
          padding: const EdgeInsets.all(10),
          backgroundColor: kPrimaryColor,
          foregroundColor: kWhiteColor,
        ),
        onPressed: function,
        child: Text(
          name,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: color ?? kWhiteColor,
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}

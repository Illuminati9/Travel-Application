import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class SearchTextFieldWidget extends StatelessWidget {
  const SearchTextFieldWidget({super.key, required this.hintText, this.isEnabled});

  final String hintText;
  final bool? isEnabled;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 10),
      child: TextField(
        enabled: isEnabled ?? false,
        decoration: InputDecoration(
          fillColor: kPrimaryBorderColor,
          focusColor: kWhiteColor,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(5),
            borderSide: const BorderSide(color: kWhiteColor,width: 0),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 10,vertical: 3),
          hintText: hintText,
        ),
      ),
    );
  }
}

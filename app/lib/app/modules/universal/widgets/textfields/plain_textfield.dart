import 'package:flutter/material.dart';

class PlainTextField extends StatelessWidget {
  const PlainTextField({super.key, required this.hintText, this.isEnabled});

  final String hintText;
  final bool? isEnabled;

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        enabled: isEnabled ?? false,
        border: InputBorder.none,
        contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        hintText: hintText,
      ),
    );
  }
}

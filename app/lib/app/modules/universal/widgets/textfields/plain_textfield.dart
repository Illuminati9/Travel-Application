import 'package:flutter/material.dart';

class PlainTextField extends StatelessWidget {
  const PlainTextField({super.key, required this.hintText});

  final String hintText;

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        border: InputBorder.none,
        contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        hintText: hintText,
      ),
    );
  }
}

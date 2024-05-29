import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class ShowLoader extends StatefulWidget {
  const ShowLoader({super.key});

  @override
  _ShowLoaderState createState() => _ShowLoaderState();
}

class _ShowLoaderState extends State<ShowLoader>
    with SingleTickerProviderStateMixin {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child:  CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(kPrimaryColor),
      ),
    );
  }

}

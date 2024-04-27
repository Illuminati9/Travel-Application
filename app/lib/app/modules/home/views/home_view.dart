import 'package:app/app/modules/home/widgets/search_widget.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        foregroundColor: whiteColor,
        title: const Text(appName),
        centerTitle: true,
      ),
      body: const Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            SearchContainerWidget()
          ],
        ),
      ),
    );
  }
}

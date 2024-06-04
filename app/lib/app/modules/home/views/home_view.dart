import 'package:app/app/modules/home/controllers/home_controller.dart';
import 'package:app/app/modules/home/widgets/search_widget.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<HomeController>(
      init: HomeController(),
      builder: (controller) {
        return Scaffold(
          appBar: AppBar(
            backgroundColor: kPrimaryColor,
            foregroundColor: kWhiteColor,
            title: const Text(appName),
            centerTitle: true,
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [SearchContainerWidget(controller: controller,)],
            ),
          ),
        );
      },
    );
  }
}

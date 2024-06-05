import 'package:app/app/modules/home/controllers/home_controller.dart';
import 'package:app/app/modules/home/widgets/search_widget.dart';
import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
                children: [
                  SearchContainerWidget(
                    controller: controller,
                  )
                ],
              ),
            ),
            bottomNavigationBar: BottomNavigationBar(
              selectedLabelStyle: TextStyle(
                  color: kPrimaryColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 12.sp),
              unselectedLabelStyle: TextStyle(
                  color: kBlackColor,
                  fontWeight: FontWeight.w600,
                  fontSize: 12.sp),
              selectedIconTheme:
                  IconThemeData(size: 28.sp, color: kPrimaryColor),
              unselectedIconTheme:
                  IconThemeData(size: 28.sp, color: kBlackColor),
              items: [
                BottomNavigationBarItem(
                  icon: IconButton(
                    onPressed: () {
                      Get.toNamed(AppPages.HOME);
                    },
                    icon: const Icon(Icons.home_rounded),
                  ),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: IconButton(
                    onPressed: () {
                      Get.toNamed(AppPages.BOOKING);
                    },
                    icon: const Icon(Icons.shopping_bag_rounded),
                  ),
                  label: 'Bookings',
                ),
              ],
            ));
      },
    );
  }
}

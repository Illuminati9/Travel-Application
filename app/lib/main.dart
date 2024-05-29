import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      child: GetMaterialApp(
        initialRoute: AppPages.HOME,
        getPages: AppPages.routes,
        debugShowCheckedModeBanner: false,
        title: 'Travel Application',
        theme: ThemeData(
          fontFamily: fontName,
          primaryColor: kPrimaryColor,
          colorScheme: ColorScheme.fromSeed(seedColor: kPrimaryColor),
          useMaterial3: true,
        ),
      ),
    );
  }
}
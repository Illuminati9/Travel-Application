import 'package:app/app/data/local/my_shared_preference.dart';
import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await MySharedPref.init();
  await dotenv.load(fileName: ".env");
  runApp(ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      splitScreenMode: true,
      useInheritedMediaQuery: true,
      builder: (context, widget) {
        return GetMaterialApp(
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
        );
      }));
}

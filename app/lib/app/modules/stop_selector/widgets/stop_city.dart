import 'package:app/utils/colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class StopCityWidget extends StatelessWidget {
  const StopCityWidget({super.key, required this.cityName});

  final String cityName;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: kPrimaryBorderColor)),
      ),
      child: Row(
        children: [
          const Icon(CupertinoIcons.location_solid,size: 18,color: kSecondaryTextColor,),
          const SizedBox(width: 5),
          Text(
            cityName,
            style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}

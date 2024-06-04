import 'package:app/app/models/stop.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class StopCityWidget extends StatelessWidget {
  const StopCityWidget({super.key, required this.stop});

  final Stop stop;

  @override
  Widget build(BuildContext context) {
    return Container(
      // padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: kPrimaryBorderColor)),
      ),
      // child: Row(
      //   children: [
      //     const Icon(CupertinoIcons.location_solid,size: 18,color: kSecondaryTextColor,),
      //     const SizedBox(width: 5),
      //     Text(
      //       stop.city.toString(),
      //       style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
      //     ),
      //   ],
      // ),
      child: ListTile(
        leading: const Icon(CupertinoIcons.location_solid, size: 18, color: kSecondaryTextColor),
        title: Text(
          stop.city.toString(),
          style: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w500),
        ),
        subtitle: Text(
          '${stop.stopName.toString()} - ${stop.pincode.toString()}',
          style: TextStyle(fontSize: 12.sp, fontWeight: FontWeight.w400),
        )
      ),
    );
  }
}

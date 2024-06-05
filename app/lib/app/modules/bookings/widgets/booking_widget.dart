import 'package:app/utils/colors.dart';
import 'package:app/utils/dummy_models/booking.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class BookingWidget extends StatelessWidget {
  const BookingWidget({super.key, required this.booking});

  final BookingDummy booking;

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        side: const BorderSide(color: kPrimaryBorderColor,width: 0.5),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(top: 5),
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Bus Booking',
                  style: TextStyle(color: kSecondaryTextColor, fontSize: 10.sp),
                ),
                const SizedBox(height: 5),
                Row(
                  children: [
                    Text(
                      booking.departure,
                      style: TextStyle(
                        color: kBlackColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 12.sp,
                      ),
                    ),
                    const SizedBox(width: 5),
                    Icon(CupertinoIcons.arrow_right, size: 18.sp),
                    const SizedBox(width: 5),
                    Text(
                      booking.arrival,
                      style: TextStyle(
                        color: kBlackColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 12.sp,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const Divider(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      CupertinoIcons.bus,
                      size: 56.spMax,
                      color: kPrimaryBorderColor,
                    ),
                    const SizedBox(width: 10),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Booking Id: ${booking.bookingId}',
                          style: TextStyle(
                            color: kBlackColor,
                            fontWeight: FontWeight.w600,
                            fontSize: 12.sp,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          'Time: ${booking.date}, ${booking.departureTime} - ${booking.arrivalTime}',
                          style: TextStyle(
                            color: kSecondaryTextColor,
                            fontSize: 11.sp,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const Icon(
                  Icons.arrow_forward_ios,
                  color: kPrimaryBorderColor,
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}

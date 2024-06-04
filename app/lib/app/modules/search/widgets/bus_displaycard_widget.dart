import 'package:app/app/models/bus_details.dart';
import 'package:app/app/models/travel.dart';
import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class BusDisplayCardWidget extends StatelessWidget {
  const BusDisplayCardWidget({super.key, required this.busDetails});

  final Travel busDetails;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        border: Border.all(color: kPrimaryBorderColor),
        borderRadius: BorderRadius.circular(5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                busDetails.busId?.name.toString() ?? 'Bus Name',
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              Text(
                '$kRupeeValue ${busDetails.price}',
                style:
                    const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ],
          ),
          Text(
            '${DateFormat('HH:MM a').format(busDetails.departure!)} - ${DateFormat('HH:MM a').format(busDetails.arrival!)}',
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          Text('${busDetails.availableSeats} Seats Available'),
          const Divider(color: kPrimaryBorderColor),
          InkWell(
            onTap: () {
              Get.toNamed(AppPages.SEATSELECTOR);
            },
            child: Container(
              alignment: Alignment.centerRight,
              child: const Text(
                'Bus Details',
                style: TextStyle(
                    color: kPrimaryColor, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

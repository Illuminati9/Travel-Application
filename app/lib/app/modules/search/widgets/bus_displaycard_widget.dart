import 'package:app/app/models/bus_details.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/material.dart';

class BusDisplayCardWidget extends StatelessWidget {
  const BusDisplayCardWidget({super.key, required this.busDetails});

  final BusDetails busDetails;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        border: Border.all(color: primaryBorderColor),
        borderRadius: BorderRadius.circular(5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                busDetails.busName,
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const Text(
                '₹7809',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                busDetails.busName,
              ),
              const Text(
                '₹7809',
              ),
            ],
          ),
           Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                busDetails.busName,
              ),
              const Text(
                '₹7809',
              ),
            ],
          ),
          const Divider(color: primaryBorderColor),
          Container(
            alignment: Alignment.centerRight,
            child: const Text(
              'Bus Details',
              style:
                  TextStyle(color: primaryColor, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}

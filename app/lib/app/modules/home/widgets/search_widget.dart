import 'package:app/app/modules/home/controllers/home_controller.dart';
import 'package:app/app/modules/universal/widgets/borders/primary_border.dart';
import 'package:app/app/modules/universal/widgets/buttons/primary_button.dart';
import 'package:app/app/modules/universal/widgets/date/date_widget.dart';
import 'package:app/app/modules/universal/widgets/headings/primary_sideheading.dart';
import 'package:app/app/modules/universal/widgets/textfields/plain_textfield.dart';
import 'package:app/app/routes/app_pages.dart';
import 'package:app/utils/colors.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SearchContainerWidget extends StatelessWidget {
  const SearchContainerWidget({super.key, required this.controller});

  final HomeController controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      decoration: BoxDecoration(
        border: Border.all(color: kPrimaryBorderColor),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.location_on,
                size: 40,
                color: kPrimaryColor,
              ),
              Expanded(
                child: Column(
                  children: [
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          elevation: 0,
                          backgroundColor: Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5),
                          ),
                          padding: const EdgeInsets.all(0)),
                      onPressed: () {
                        Get.toNamed(AppPages.STOPSELECTOR,
                            arguments: 'departure');
                      },
                      child: PlainTextField(
                        hintText: controller.departure.value.city != null
                            ? controller.departure.value.city.toString()
                            : 'Departure',
                      ),
                    ),
                    const PrimaryBorder(),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          elevation: 0,
                          backgroundColor: Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5),
                          ),
                          padding: const EdgeInsets.all(0)),
                      onPressed: () {
                        Get.toNamed(AppPages.STOPSELECTOR,
                            arguments: 'destination');
                      },
                      child: PlainTextField(
                        hintText: controller.destination.value.city != null
                            ? controller.destination.value.city.toString()
                            : 'Destination',
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () {
                  controller.swapStops();
                },
                icon: const Icon(
                  CupertinoIcons.arrow_up_arrow_down,
                  size: 30,
                  color: kPrimaryColor,
                ),
              ),
            ],
          ),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 5, horizontal: 5),
            child: PrimarySideHeadingWidget(data: 'Departure Date'),
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 5),
            alignment: Alignment.center,
            height: Get.height / 12,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ListView.builder(
                  shrinkWrap: true,
                  scrollDirection: Axis.horizontal,
                  itemCount: 4,
                  itemBuilder: (context, index) => DateWidget(
                    date: controller.selectedDate.value
                        .add(Duration(days: index-1)),
                    isSelected: controller.selectedDate.value ==
                        controller.selectedDate.value
                            .add(Duration(days: index-1)),
                  ),
                ),
                const VerticalDivider(color: kPrimaryBorderColor),
                IconButton(
                    onPressed: () async {
                      final DateTime? date = await showDatePicker(
                          context: context,
                          firstDate: DateTime.now(),
                          lastDate: DateTime(2100));

                      if (date != null &&
                          date != controller.selectedDate.value) {
                        controller.setDate(date);
                      }
                    },
                    icon: const Icon(
                      Icons.calendar_month_rounded,
                      size: 30,
                    ))
              ],
            ),
          ),
          PrimaryButton(
            name: 'Search Buses',
            function: () {
              if(controller.departure.value.city == null || controller.destination.value.city == null){
                Get.snackbar('Error', 'Please select Departure and Destination');
                return;
              }else if(controller.selectedDate.value == null){
                Get.snackbar('Error', 'Please select Departure Date');
                return;
              }else{
                Get.toNamed(AppPages.SEARCHRESULT,arguments: {'departure':controller.departure.value,'destination':controller.destination.value,'date':controller.selectedDate.value});
              }
            },
          )
        ],
      ),
    );
  }
}

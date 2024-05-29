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
  const SearchContainerWidget({super.key});

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
                        Get.toNamed(AppPages.STOPSELECTOR);
                      },
                      child: const PlainTextField(
                        hintText: 'Departure',
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
                        Get.toNamed(AppPages.STOPSELECTOR);
                      },
                      child: const PlainTextField(
                        hintText: 'Destination',
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(
                CupertinoIcons.arrow_up_arrow_down,
                size: 30,
                color: kPrimaryColor,
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
                  itemBuilder: (context, index) =>
                      DateWidget(date: DateTime.now()),
                ),
                const VerticalDivider(color: kPrimaryBorderColor),
                IconButton(
                    onPressed: () {
                      showDatePicker(
                          context: context,
                          firstDate: DateTime.now(),
                          lastDate: DateTime(2100));
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
              Get.toNamed(AppPages.SEARCHRESULT);
            },
          )
        ],
      ),
    );
  }
}

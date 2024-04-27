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
        border: Border.all(color: primaryBorderColor),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(
                Icons.location_on,
                size: 40,
                color: primaryColor,
              ),
              Expanded(
                child: Column(
                  children: [
                    PlainTextField(
                      hintText: 'Departure',
                    ),
                    PrimaryBorder(),
                    PlainTextField(
                      hintText: 'Destination',
                    ),
                  ],
                ),
              ),
              Icon(
                CupertinoIcons.arrow_up_arrow_down,
                size: 30,
                color: primaryColor,
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
            child: ListView.builder(
              shrinkWrap: true,
              scrollDirection: Axis.horizontal,
              itemCount: 5,
              itemBuilder: (context, index) => DateWidget(date: DateTime.now()),
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

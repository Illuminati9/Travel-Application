import 'package:app/utils/colors.dart';
import 'package:app/utils/data/fake_bus_details_data.dart';
import 'package:app/app/modules/search/widgets/bus_displaycard_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class SearchResultView extends StatelessWidget {
  const SearchResultView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButtonWidget(),
        backgroundColor: kPrimaryColor,
        title: const Text(
          'Search Results',
          style: TextStyle(color: kWhiteColor),
        ),
      ),
      body: Column(children: [
        Container(),
        Expanded(
          child: ListView.builder(
              itemCount: busDetailsList.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return BusDisplayCardWidget(busDetails: busDetailsList[index]);
              }),
        ),
      ]),
    );
  }
}

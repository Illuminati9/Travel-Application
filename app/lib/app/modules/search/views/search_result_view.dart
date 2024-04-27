import 'package:app/app/data/fake_bus_details_data.dart';
import 'package:app/app/modules/search/widgets/bus_displaycard_widget.dart';
import 'package:app/app/modules/universal/widgets/buttons/back_button.dart';
import 'package:flutter/material.dart';

class SearchResultView extends StatelessWidget {
  const SearchResultView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButtonWidget(),
        title: const Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text('Hello world-ksdkfjsalk'),
          ],
        ),
        centerTitle: false,
      ),
      body: ListView.builder(
          itemCount: busDetailsList.length,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemBuilder: (context, index) {
            return BusDisplayCardWidget(busDetails: busDetailsList[index]);
          }),
    );
  }
}

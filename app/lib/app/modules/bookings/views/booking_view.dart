import 'package:app/app/modules/bookings/widgets/booking_widget.dart';
import 'package:app/utils/colors.dart';
import 'package:app/utils/data/dummy_booking_data.dart';
import 'package:flutter/material.dart';

class BookingView extends StatelessWidget {
  const BookingView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bookings'),
        backgroundColor: kPrimaryColor,
        foregroundColor: kWhiteColor,
      ),
      body: ListView.builder(
        itemCount: bookingData.length,
        shrinkWrap: true,
        itemBuilder: (context, index) => BookingWidget(
          booking: bookingData[index],
        ),
      ),
    );
  }
}
